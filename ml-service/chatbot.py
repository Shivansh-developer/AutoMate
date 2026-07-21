import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.documents import Document

load_dotenv()

embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

llm = ChatGroq(
    groq_api_key=os.getenv("GROQ_API_KEY"),
    model_name="llama-3.1-8b-instant"
)

def vehicles_to_documents(vehicles: list):
    """Convert vehicle listings into text documents for the knowledge base"""
    docs = []
    for v in vehicles:
        text = (
            f"{v['brand']} {v['model']} ({v['year']}), a {v['type']}. "
            f"Price: Rs {v['price']:,}. Fuel type: {v['fuelType']}. "
            f"Transmission: {v['transmission']}. KM driven: {v['kmDriven']:,}. "
            f"This vehicle has id {v['id']}."
        )
        docs.append(Document(page_content=text, metadata={"id": v["id"]}))
    return docs

def build_vectorstore(vehicles: list):
    docs = vehicles_to_documents(vehicles)
    splitter = RecursiveCharacterTextSplitter(chunk_size=300, chunk_overlap=20)
    split_docs = splitter.split_documents(docs)
    vectorstore = FAISS.from_documents(split_docs, embeddings)
    return vectorstore

def ask_chatbot(question: str, vehicles: list):
    vectorstore = build_vectorstore(vehicles)
    relevant_docs = vectorstore.similarity_search(question, k=4)
    context = "\n".join([doc.page_content for doc in relevant_docs])

    prompt = f"""You are a helpful car buying assistant for AutoMate marketplace.
Use the following vehicle listings to answer the user's question. Only recommend vehicles from the listings below. If nothing matches, say so honestly.

Listings:
{context}

Question: {question}

Answer clearly and concisely, mentioning specific vehicles by brand and model where relevant."""

    response = llm.invoke(prompt)
    return response.content
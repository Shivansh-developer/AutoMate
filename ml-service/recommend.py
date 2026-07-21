import pandas as pd
from sklearn.preprocessing import OneHotEncoder, MinMaxScaler
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

def get_similar_vehicles(vehicles: list, target_id: int, top_n: int = 3):
    """
    vehicles: list of dicts, each with id, brand, type, price, year, fuelType, transmission
    target_id: the vehicle the user is currently viewing
    """
    df = pd.DataFrame(vehicles)

    if len(df) < 2:
        return []

    # Encode categorical features
    cat_features = df[['brand', 'type', 'fuelType', 'transmission']]
    encoder = OneHotEncoder()
    cat_encoded = encoder.fit_transform(cat_features).toarray()

    # Scale numerical features
    num_features = df[['price', 'year']]
    scaler = MinMaxScaler()
    num_scaled = scaler.fit_transform(num_features)

    # Combine into one feature matrix
    feature_matrix = np.hstack([cat_encoded, num_scaled])

    # Compute similarity between all vehicles
    similarity_matrix = cosine_similarity(feature_matrix)

    # Find index of target vehicle
    target_index = df[df['id'] == target_id].index
    if len(target_index) == 0:
        return []
    target_index = target_index[0]

    # Get similarity scores for target vehicle, sorted descending
    scores = list(enumerate(similarity_matrix[target_index]))
    scores = sorted(scores, key=lambda x: x[1], reverse=True)

    # Exclude the vehicle itself, take top_n
    similar_indices = [i for i, score in scores if i != target_index][:top_n]

    return df.iloc[similar_indices]['id'].tolist()
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-dark text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold tracking-tight">
          Auto<span className="text-primary">Mate</span>
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-primary transition">Home</Link>
          <Link to="/compare" className="hover:text-primary transition">Compare</Link>
          <Link to="/sell" className="hover:text-primary transition">Sell</Link>
          <Link to="/chat" className="hover:text-primary transition">🤖 AI Assistant</Link>
          <Link to="/login" className="hover:text-primary transition">Login</Link>
          <Link
            to="/register"
            className="bg-primary text-white px-4 py-2 rounded-full hover:opacity-90 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
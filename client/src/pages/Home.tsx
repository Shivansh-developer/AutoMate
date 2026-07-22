import { useEffect, useState } from 'react';
import axios from 'axios';
import axiosInstance from '../api/axiosInstance';
import { Link } from 'react-router-dom';

const BACKEND_URL = 'https://sunny-celebration-production-3859.up.railway.app';
const RECOMMENDATION_URL = 'http://localhost:8000'; // Replace with deployed ML service URL when live

interface Vehicle {
  id: number;
  type: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  fuelType: string;
  kmDriven: number;
  transmission: string;
  images: string[];
}

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  image: string;
  publishedAt: string;
  source: { name: string };
}

const BRANDS = ['Maruti', 'Hyundai', 'Honda', 'Toyota', 'Tata', 'Mahindra'];

function Home() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [recommended, setRecommended] = useState<Vehicle[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [brand, setBrand] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const fetchVehicles = (overrideParams?: Record<string, string>) => {
    setLoading(true);
    const params: Record<string, string> = overrideParams || {};

    if (!overrideParams) {
      if (search) params.search = search;
      if (brand) params.brand = brand;
      if (fuelType) params.fuelType = fuelType;
      if (maxPrice) params.maxPrice = maxPrice;
    }

    axiosInstance.get('/vehicles', { params })
      .then((res) => setVehicles(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchVehicles();
    axiosInstance.get('/news')
      .then((res) => setNews(res.data))
      .catch((err) => console.error(err))
      .finally(() => setNewsLoading(false));
  }, []);

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchVehicles();
  };

  const clearFilters = () => {
    setSearch('');
    setBrand('');
    setFuelType('');
    setMaxPrice('');
    fetchVehicles({});
  };

  const showSimilar = async (e: React.MouseEvent, vehicle: Vehicle) => {
    e.preventDefault();
    e.stopPropagation();

    setSelectedId(vehicle.id);
    try {
      const res = await axios.post(`${RECOMMENDATION_URL}/recommend`, {
        vehicles: vehicles.map((v) => ({
          id: v.id,
          brand: v.brand,
          type: v.type,
          price: v.price,
          year: v.year,
          fuelType: v.fuelType,
          transmission: v.transmission,
        })),
        target_id: vehicle.id,
      });
      const ids: number[] = res.data.similar_vehicle_ids;
      setRecommended(vehicles.filter((v) => ids.includes(v.id)));
    } catch (err) {
      console.error(err);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen">
      <div className="bg-dark text-white py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">
          Find Your Perfect <span className="text-primary">Ride</span>
        </h1>
        <p className="text-gray-300 text-lg">
          AI-powered car & bike marketplace - buy, sell, compare, and get smart price estimates.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-dark mb-6">Available Vehicles</h2>

        <form onSubmit={handleFilterSubmit} className="bg-white rounded-2xl shadow-sm p-4 mb-8 flex flex-wrap gap-3 items-center">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search brand or model..."
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm flex-1 min-w-[180px]"
          />
          <select value={brand} onChange={(e) => setBrand(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
            <option value="">All Brands</option>
            {BRANDS.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
          <select value={fuelType} onChange={(e) => setFuelType(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
            <option value="">All Fuel Types</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="CNG">CNG</option>
          </select>
          <input
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            type="number"
            placeholder="Max Price"
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-32"
          />
          <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg text-sm hover:opacity-90 transition">
            Search
          </button>
          <button type="button" onClick={clearFilters} className="text-gray-500 text-sm underline">
            Clear
          </button>
        </form>

        {loading && <p>Loading vehicles...</p>}
        {!loading && vehicles.length === 0 && (
          <p className="text-gray-500">No vehicles match your search.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {vehicles.map((v) => (
            <Link
              to={`/vehicle/${v.id}`}
              key={v.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden border border-gray-100 block"
            >
              {v.images && v.images.length > 0 ? (
                <img
                  src={`${BACKEND_URL}${v.images[0]}`}
                  alt={`${v.brand} ${v.model}`}
                  className="w-full h-44 object-cover"
                />
              ) : (
                <div className="w-full h-44 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                  No Image Available
                </div>
              )}
              <div className="p-4">
                <h3 className="font-semibold text-lg text-dark">{v.brand} {v.model}</h3>
                <p className="text-gray-500 text-sm mb-2">{v.year} - {v.fuelType} - {v.transmission}</p>
                <p className="text-primary font-bold text-xl mb-3">Rs {v.price.toLocaleString()}</p>
                <p className="text-gray-400 text-xs mb-4">{v.kmDriven.toLocaleString()} km driven</p>
                <button
                  onClick={(e) => showSimilar(e, v)}
                  className="w-full bg-dark text-white text-sm py-2 rounded-lg hover:bg-primary transition"
                >
                  Show Similar Vehicles
                </button>
              </div>
            </Link>
          ))}
        </div>

        {selectedId && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-dark mb-6">Recommended For You</h2>
            {recommended.length === 0 && (
              <p className="text-gray-500">No similar vehicles found (need more listings).</p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recommended.map((v) => (
                <div key={v.id} className="bg-white rounded-2xl shadow-sm border border-primary p-4">
                  <h3 className="font-semibold text-dark">{v.brand} {v.model} ({v.year})</h3>
                  <p className="text-primary font-bold">Rs {v.price.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <h2 className="text-2xl font-bold text-dark mb-6">Latest Car News</h2>
        {newsLoading && <p>Loading news...</p>}
        {!newsLoading && news.length === 0 && <p className="text-gray-500">No news available right now.</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((article, i) => (
            <a
              key={i}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden border border-gray-100 block"
            >
              {article.image ? (
                <img src={article.image} alt={article.title} className="w-full h-40 object-cover" />
              ) : (
                <div className="w-full h-40 bg-gray-100" />
              )}
              <div className="p-4">
                <p className="text-xs text-primary font-medium mb-1">{article.source?.name} - {formatDate(article.publishedAt)}</p>
                <h3 className="font-semibold text-dark text-sm leading-snug">{article.title}</h3>
                <p className="text-gray-500 text-xs mt-2">{article.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
import { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

interface CarModel {
  id: number;
  brand: string;
  model: string;
  category: string;
  priceMin: number;
  priceMax: number;
  fuelTypes: string;
  mileage: string;
  engine: string;
  transmission: string;
  seating: number;
  imageUrl: string | null;
}

function Catalog() {
  const [cars, setCars] = useState<CarModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [selectedCar, setSelectedCar] = useState<CarModel | null>(null);

  const fetchCars = (params: Record<string, string> = {}) => {
    setLoading(true);
    axiosInstance.get('/catalog', { params })
      .then((res) => setCars(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params: Record<string, string> = {};
    if (search) params.search = search;
    if (category) params.category = category;
    fetchCars(params);
  };

  const categories = ['Hatchback', 'Sedan', 'SUV', 'MPV', 'Electric SUV'];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-dark text-white py-14 px-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">New Car Catalog</h1>
        <p className="text-gray-300">Explore specs, prices, and details of popular cars in India</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-sm p-4 mb-8 flex flex-wrap gap-3 items-center">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search brand or model..."
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm flex-1 min-w-[200px]"
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
            <option value="">All Categories</option>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg text-sm hover:opacity-90 transition">
            Search
          </button>
        </form>

        {loading && <p>Loading catalog...</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div
              key={car.id}
              onClick={() => setSelectedCar(car)}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden cursor-pointer border border-gray-100"
            >
              {car.imageUrl ? (
                <img src={car.imageUrl} alt={`${car.brand} ${car.model}`} className="w-full h-36 object-cover" />
              ) : (
                <div className="w-full h-36 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-5xl">
                  🚗
                </div>
              )}
              <div className="p-5">
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{car.category}</span>
                <h3 className="text-lg font-semibold text-dark mt-2">{car.brand} {car.model}</h3>
                <p className="text-primary font-bold text-lg mt-1">
                  Rs {car.priceMin} - {car.priceMax} Lakh
                </p>
                <div className="text-sm text-gray-500 mt-2 space-y-1">
                  <p>Fuel: {car.fuelTypes}</p>
                  <p>Mileage: {car.mileage}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedCar && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 z-50"
            onClick={() => setSelectedCar(null)}
          >
            <div
              className="bg-white rounded-2xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedCar.imageUrl ? (
                <img
                  src={selectedCar.imageUrl}
                  alt={`${selectedCar.brand} ${selectedCar.model}`}
                  className="w-full h-40 rounded-xl object-cover mb-4"
                />
              ) : (
                <div className="w-full h-40 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center text-6xl mb-4">
                  🚗
                </div>
              )}
              <h2 className="text-xl font-bold text-dark mb-1">{selectedCar.brand} {selectedCar.model}</h2>
              <p className="text-primary font-bold text-2xl mb-4">
                Rs {selectedCar.priceMin} - {selectedCar.priceMax} Lakh
              </p>
              <div className="space-y-2 text-sm">
                <p><span className="text-gray-500">Category:</span> {selectedCar.category}</p>
                <p><span className="text-gray-500">Engine:</span> {selectedCar.engine}</p>
                <p><span className="text-gray-500">Fuel Types:</span> {selectedCar.fuelTypes}</p>
                <p><span className="text-gray-500">Mileage:</span> {selectedCar.mileage}</p>
                <p><span className="text-gray-500">Transmission:</span> {selectedCar.transmission}</p>
                <p><span className="text-gray-500">Seating Capacity:</span> {selectedCar.seating}</p>
              </div>
              <button
                onClick={() => setSelectedCar(null)}
                className="mt-6 w-full bg-dark text-white py-2 rounded-lg hover:bg-primary transition"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Catalog;
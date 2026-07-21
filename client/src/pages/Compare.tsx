import { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

interface Vehicle {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  fuelType: string;
  kmDriven: number;
  transmission: string;
}

function Compare() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [compared, setCompared] = useState<Vehicle[]>([]);

  useEffect(() => {
    axiosInstance.get('/vehicles').then((res) => setVehicles(res.data));
  }, []);

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const handleCompare = async () => {
    const res = await axiosInstance.post('/vehicles/compare', { ids: selectedIds });
    setCompared(res.data);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-dark mb-2">Compare Vehicles</h2>
        <p className="text-gray-500 mb-6">Select up to 3 vehicles to compare side by side</p>

        <div className="flex flex-wrap gap-3 mb-6">
          {vehicles.map((v) => (
            <label
              key={v.id}
              className={`border rounded-xl px-4 py-2 cursor-pointer transition ${
                selectedIds.includes(v.id) ? 'border-primary bg-red-50' : 'border-gray-300 bg-white'
              }`}
            >
              <input
                type="checkbox"
                checked={selectedIds.includes(v.id)}
                onChange={() => toggleSelect(v.id)}
                className="mr-2"
              />
              {v.brand} {v.model} ({v.year})
            </label>
          ))}
        </div>

        <button
          onClick={handleCompare}
          disabled={selectedIds.length < 2}
          className="bg-dark text-white px-6 py-2 rounded-lg disabled:opacity-40 hover:bg-primary transition"
        >
          Compare Now
        </button>

        {compared.length > 0 && (
          <div className="mt-8 bg-white rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-dark text-white">
                <tr>
                  <th className="p-4">Spec</th>
                  {compared.map((v) => (
                    <th key={v.id} className="p-4">{v.brand} {v.model}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b"><td className="p-4 font-medium text-gray-600">Price</td>{compared.map((v) => <td key={v.id} className="p-4">₹{v.price.toLocaleString()}</td>)}</tr>
                <tr className="border-b"><td className="p-4 font-medium text-gray-600">Fuel Type</td>{compared.map((v) => <td key={v.id} className="p-4">{v.fuelType}</td>)}</tr>
                <tr className="border-b"><td className="p-4 font-medium text-gray-600">KM Driven</td>{compared.map((v) => <td key={v.id} className="p-4">{v.kmDriven.toLocaleString()}</td>)}</tr>
                <tr><td className="p-4 font-medium text-gray-600">Transmission</td>{compared.map((v) => <td key={v.id} className="p-4">{v.transmission}</td>)}</tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Compare;
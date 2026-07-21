import { useState } from 'react';
import axios from 'axios';

function SellVehicle() {
  const [form, setForm] = useState({
    type: 'car', brand: 'Honda', model: '', year: 2022, price: '',
    fuelType: 'Petrol', kmDriven: '', transmission: 'Manual',
  });
  const [images, setImages] = useState<FileList | null>(null);
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [estimating, setEstimating] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => setImages(e.target.files);

  const getAIEstimate = async () => {
    setEstimating(true);
    setMessage('');
    try {
      const res = await axios.post('http://localhost:8000/predict', {
        brand: form.brand, year: Number(form.year), km_driven: Number(form.kmDriven),
        fuel_type: form.fuelType, transmission: form.transmission,
      });
      setEstimatedPrice(res.data.predicted_price);
    } catch (err) {
      setMessage('Could not get AI estimate. Make sure the ML service is running.');
    } finally {
      setEstimating(false);
    }
  };

  const useEstimatedPrice = () => {
    if (estimatedPrice) setForm({ ...form, price: String(estimatedPrice) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => formData.append(key, String(value)));
      if (images) Array.from(images).forEach((file) => formData.append('images', file));

      const res = await axios.post('http://localhost:5000/api/vehicles', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage(res.data.message);
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Something went wrong');
    }
  };

  const inputClass = "border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary";

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-dark mb-6 text-center">Sell Your Vehicle</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <select name="type" onChange={handleChange} value={form.type} className={inputClass}>
            <option value="car">Car</option>
            <option value="bike">Bike</option>
          </select>
          <select name="brand" onChange={handleChange} value={form.brand} className={inputClass}>
            <option>Maruti</option><option>Hyundai</option><option>Honda</option>
            <option>Toyota</option><option>Tata</option><option>Mahindra</option>
          </select>
          <input name="model" placeholder="Model (e.g. City)" onChange={handleChange} required className={inputClass} />
          <input name="year" type="number" placeholder="Year" value={form.year} onChange={handleChange} required className={inputClass} />
          <input name="kmDriven" type="number" placeholder="KM Driven" onChange={handleChange} required className={inputClass} />
          <select name="fuelType" onChange={handleChange} value={form.fuelType} className={inputClass}>
            <option>Petrol</option><option>Diesel</option><option>CNG</option>
          </select>
          <select name="transmission" onChange={handleChange} value={form.transmission} className={inputClass}>
            <option>Manual</option><option>Automatic</option>
          </select>

          <label className="text-sm text-gray-600">Vehicle Photos (up to 5)</label>
          <input type="file" accept="image/*" multiple onChange={handleFileChange} className="text-sm" />

          <button
            type="button" onClick={getAIEstimate} disabled={estimating}
            className="bg-dark text-white py-2 rounded-lg hover:bg-primary transition disabled:opacity-50"
          >
            {estimating ? 'Estimating...' : '🤖 Get AI Price Estimate'}
          </button>

          {estimatedPrice !== null && (
            <div className="bg-red-50 border border-primary rounded-lg p-4 text-sm">
              <p>AI Estimated Price: <strong>₹{estimatedPrice.toLocaleString()}</strong></p>
              <button type="button" onClick={useEstimatedPrice} className="text-primary underline mt-1">Use This Price</button>
            </div>
          )}

          <input name="price" type="number" placeholder="Listing Price (₹)" value={form.price} onChange={handleChange} required className={inputClass} />

          <button type="submit" className="bg-primary text-white py-2 rounded-lg font-medium hover:opacity-90 transition">
            List Vehicle
          </button>
        </form>
        {message && <p className="text-center mt-4 text-sm text-gray-600">{message}</p>}
      </div>
    </div>
  );
}

export default SellVehicle;
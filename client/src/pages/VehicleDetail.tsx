import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

const BACKEND_URL = 'https://sunny-celebration-production-3859.up.railway.app';

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

function VehicleDetail() {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);

  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('9');
  const [tenure, setTenure] = useState('5');
  const [emi, setEmi] = useState<number | null>(null);

  useEffect(() => {
    axiosInstance.get(`/vehicles/${id}`)
      .then((res) => {
        setVehicle(res.data);
        setLoanAmount(String(res.data.price));
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const calculateEMI = () => {
    const P = Number(loanAmount);
    const R = Number(interestRate) / 12 / 100;
    const N = Number(tenure) * 12;
    if (P <= 0 || R <= 0 || N <= 0) return;
    const emiValue = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    setEmi(Math.round(emiValue));
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!vehicle) return <div className="p-10 text-center">Vehicle not found.</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-5xl mx-auto">
        <Link to="/" className="text-primary text-sm underline mb-4 inline-block">← Back to listings</Link>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
          {vehicle.images && vehicle.images.length > 0 ? (
            <img
              src={`${BACKEND_URL}${vehicle.images[0]}`}
              alt={vehicle.brand + ' ' + vehicle.model}
              className="w-full h-80 object-cover"
            />
          ) : (
            <div className="w-full h-80 bg-gray-100 flex items-center justify-center text-gray-400">
              No Image Available
            </div>
          )}
          <div className="p-6">
            <h1 className="text-2xl font-bold text-dark mb-1">{vehicle.brand} {vehicle.model}</h1>
            <p className="text-gray-500 mb-4">{vehicle.year} · {vehicle.type}</p>
            <p className="text-primary font-bold text-3xl mb-6">Rs {vehicle.price.toLocaleString()}</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-400">Fuel Type</p>
                <p className="font-semibold text-dark">{vehicle.fuelType}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-400">Transmission</p>
                <p className="font-semibold text-dark">{vehicle.transmission}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-400">KM Driven</p>
                <p className="font-semibold text-dark">{vehicle.kmDriven.toLocaleString()}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-400">Year</p>
                <p className="font-semibold text-dark">{vehicle.year}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-dark mb-4">EMI Calculator</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="text-sm text-gray-500">Loan Amount (Rs)</label>
              <input
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                type="number"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
              />
            </div>
            <div>
              <label className="text-sm text-gray-500">Interest Rate (% p.a.)</label>
              <input
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                type="number"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
              />
            </div>
            <div>
              <label className="text-sm text-gray-500">Tenure (Years)</label>
              <input
                value={tenure}
                onChange={(e) => setTenure(e.target.value)}
                type="number"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
              />
            </div>
          </div>
          <button
            onClick={calculateEMI}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:opacity-90 transition"
          >
            Calculate EMI
          </button>

          {emi !== null && (
            <div className="mt-6 bg-red-50 border border-primary rounded-lg p-4">
              <p className="text-gray-600 text-sm">Estimated Monthly EMI</p>
              <p className="text-primary font-bold text-2xl">Rs {emi.toLocaleString()} / month</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VehicleDetail;
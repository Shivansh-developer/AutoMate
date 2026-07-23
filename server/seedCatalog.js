const sequelize = require('./src/config/db');
const CarCatalog = require('./src/models/CarCatalog');

const cars = [
  { brand: 'Maruti Suzuki', model: 'Alto K10', category: 'Hatchback', priceMin: 3.7, priceMax: 5.9, fuelTypes: 'Petrol, CNG', mileage: '24.9 km/l', engine: '998cc', transmission: 'Manual/AMT', seating: 5 },
  { brand: 'Maruti Suzuki', model: 'Swift', category: 'Hatchback', priceMin: 6.5, priceMax: 9.5, fuelTypes: 'Petrol, CNG', mileage: '22.9 km/l', engine: '1197cc', transmission: 'Manual/AMT', seating: 5 },
  { brand: 'Maruti Suzuki', model: 'Baleno', category: 'Hatchback', priceMin: 6.6, priceMax: 9.9, fuelTypes: 'Petrol, CNG', mileage: '22.4 km/l', engine: '1197cc', transmission: 'Manual/AMT', seating: 5 },
  { brand: 'Maruti Suzuki', model: 'WagonR', category: 'Hatchback', priceMin: 5.6, priceMax: 7.3, fuelTypes: 'Petrol, CNG', mileage: '25.2 km/l', engine: '998cc', transmission: 'Manual/AMT', seating: 5 },
  { brand: 'Maruti Suzuki', model: 'Dzire', category: 'Sedan', priceMin: 6.8, priceMax: 10.1, fuelTypes: 'Petrol, CNG', mileage: '24.4 km/l', engine: '1197cc', transmission: 'Manual/AMT', seating: 5 },
  { brand: 'Maruti Suzuki', model: 'Brezza', category: 'SUV', priceMin: 8.3, priceMax: 14.2, fuelTypes: 'Petrol, CNG', mileage: '19.8 km/l', engine: '1462cc', transmission: 'Manual/Automatic', seating: 5 },
  { brand: 'Maruti Suzuki', model: 'Fronx', category: 'SUV', priceMin: 6.9, priceMax: 12.4, fuelTypes: 'Petrol, CNG', mileage: '21.8 km/l', engine: '998cc/1197cc', transmission: 'Manual/Automatic', seating: 5 },
  { brand: 'Maruti Suzuki', model: 'Ertiga', category: 'MPV', priceMin: 8.8, priceMax: 13.5, fuelTypes: 'Petrol, CNG', mileage: '20.5 km/l', engine: '1462cc', transmission: 'Manual/Automatic', seating: 7 },
  { brand: 'Hyundai', model: 'Grand i10 Nios', category: 'Hatchback', priceMin: 5.9, priceMax: 8.6, fuelTypes: 'Petrol, CNG', mileage: '20.3 km/l', engine: '1197cc', transmission: 'Manual/AMT', seating: 5 },
  { brand: 'Hyundai', model: 'i20', category: 'Hatchback', priceMin: 7.2, priceMax: 11.4, fuelTypes: 'Petrol', mileage: '20.3 km/l', engine: '1197cc/998cc Turbo', transmission: 'Manual/DCT', seating: 5 },
  { brand: 'Hyundai', model: 'Venue', category: 'SUV', priceMin: 8.0, priceMax: 14.0, fuelTypes: 'Petrol, Diesel', mileage: '18.7 km/l', engine: '1197cc/998cc Turbo', transmission: 'Manual/DCT', seating: 5 },
  { brand: 'Hyundai', model: 'Creta', category: 'SUV', priceMin: 11.1, priceMax: 20.4, fuelTypes: 'Petrol, Diesel', mileage: '21.8 km/l', engine: '1497cc/1493cc Diesel', transmission: 'Manual/Automatic', seating: 5 },
  { brand: 'Hyundai', model: 'Verna', category: 'Sedan', priceMin: 11.0, priceMax: 17.4, fuelTypes: 'Petrol', mileage: '20.6 km/l', engine: '1497cc/1353cc Turbo', transmission: 'Manual/Automatic', seating: 5 },
  { brand: 'Tata', model: 'Tiago', category: 'Hatchback', priceMin: 5.7, priceMax: 8.6, fuelTypes: 'Petrol, CNG', mileage: '20.0 km/l', engine: '1199cc', transmission: 'Manual/AMT', seating: 5 },
  { brand: 'Tata', model: 'Punch', category: 'SUV', priceMin: 5.7, priceMax: 10.2, fuelTypes: 'Petrol, CNG', mileage: '20.1 km/l', engine: '1199cc', transmission: 'Manual/AMT', seating: 5 },
  { brand: 'Tata', model: 'Nexon', category: 'SUV', priceMin: 8.0, priceMax: 15.6, fuelTypes: 'Petrol, Diesel, CNG', mileage: '24.1 km/l', engine: '1199cc/1497cc Diesel', transmission: 'Manual/Automatic', seating: 5 },
  { brand: 'Tata', model: 'Harrier', category: 'SUV', priceMin: 15.5, priceMax: 26.5, fuelTypes: 'Diesel', mileage: '16.8 km/l', engine: '1956cc Diesel', transmission: 'Manual/Automatic', seating: 5 },
  { brand: 'Tata', model: 'Sierra', category: 'SUV', priceMin: 11.5, priceMax: 20.0, fuelTypes: 'Petrol, Diesel', mileage: '18.5 km/l', engine: '1199cc Turbo/1497cc Diesel', transmission: 'Manual/Automatic', seating: 5 },
  { brand: 'Mahindra', model: 'Bolero', category: 'SUV', priceMin: 9.6, priceMax: 11.6, fuelTypes: 'Diesel', mileage: '16.7 km/l', engine: '1493cc Diesel', transmission: 'Manual', seating: 7 },
  { brand: 'Mahindra', model: 'Scorpio-N', category: 'SUV', priceMin: 13.9, priceMax: 24.0, fuelTypes: 'Petrol, Diesel', mileage: '16.2 km/l', engine: '1997cc Petrol/2184cc Diesel', transmission: 'Manual/Automatic', seating: 7 },
  { brand: 'Mahindra', model: 'Thar', category: 'SUV', priceMin: 12.1, priceMax: 18.2, fuelTypes: 'Petrol, Diesel', mileage: '15.2 km/l', engine: '1997cc/2184cc Diesel', transmission: 'Manual/Automatic', seating: 4 },
  { brand: 'Mahindra', model: 'XUV 7XO', category: 'SUV', priceMin: 14.0, priceMax: 26.0, fuelTypes: 'Petrol, Diesel', mileage: '15.4 km/l', engine: '1997cc/2184cc Diesel', transmission: 'Manual/Automatic', seating: 7 },
  { brand: 'Kia', model: 'Sonet', category: 'SUV', priceMin: 8.0, priceMax: 15.0, fuelTypes: 'Petrol, Diesel', mileage: '18.4 km/l', engine: '1197cc/998cc Turbo', transmission: 'Manual/DCT', seating: 5 },
  { brand: 'Kia', model: 'Seltos', category: 'SUV', priceMin: 11.0, priceMax: 20.4, fuelTypes: 'Petrol, Diesel', mileage: '18.3 km/l', engine: '1497cc/1493cc Diesel', transmission: 'Manual/Automatic', seating: 5 },
  { brand: 'Toyota', model: 'Glanza', category: 'Hatchback', priceMin: 6.9, priceMax: 9.8, fuelTypes: 'Petrol, CNG', mileage: '22.4 km/l', engine: '1197cc', transmission: 'Manual/AMT', seating: 5 },
  { brand: 'Toyota', model: 'Urban Cruiser Taisor', category: 'SUV', priceMin: 8.0, priceMax: 13.0, fuelTypes: 'Petrol, CNG', mileage: '21.8 km/l', engine: '998cc/1197cc', transmission: 'Manual/Automatic', seating: 5 },
  { brand: 'Toyota', model: 'Innova Crysta', category: 'MPV', priceMin: 21.0, priceMax: 28.0, fuelTypes: 'Diesel', mileage: '14.0 km/l', engine: '2393cc Diesel', transmission: 'Manual/Automatic', seating: 7 },
  { brand: 'Toyota', model: 'Innova Hycross', category: 'MPV', priceMin: 20.0, priceMax: 31.0, fuelTypes: 'Petrol, Hybrid', mileage: '23.24 km/l', engine: '1987cc/1987cc Hybrid', transmission: 'CVT', seating: 7 },
  { brand: 'Honda', model: 'Amaze', category: 'Sedan', priceMin: 8.0, priceMax: 11.0, fuelTypes: 'Petrol', mileage: '19.5 km/l', engine: '1199cc', transmission: 'Manual/CVT', seating: 5 },
  { brand: 'Honda', model: 'City', category: 'Sedan', priceMin: 11.9, priceMax: 16.4, fuelTypes: 'Petrol, Hybrid', mileage: '18.4 km/l', engine: '1498cc', transmission: 'Manual/CVT', seating: 5 },
  { brand: 'Honda', model: 'Elevate', category: 'SUV', priceMin: 11.5, priceMax: 17.2, fuelTypes: 'Petrol', mileage: '16.9 km/l', engine: '1498cc', transmission: 'Manual/CVT', seating: 5 },
  { brand: 'Skoda', model: 'Kushaq', category: 'SUV', priceMin: 11.9, priceMax: 19.4, fuelTypes: 'Petrol', mileage: '18.5 km/l', engine: '999cc Turbo/1498cc Turbo', transmission: 'Manual/Automatic', seating: 5 },
  { brand: 'Volkswagen', model: 'Taigun', category: 'SUV', priceMin: 12.0, priceMax: 19.8, fuelTypes: 'Petrol', mileage: '18.3 km/l', engine: '999cc Turbo/1498cc Turbo', transmission: 'Manual/Automatic', seating: 5 },
  { brand: 'Nissan', model: 'Tekton', category: 'SUV', priceMin: 10.5, priceMax: 18.0, fuelTypes: 'Petrol', mileage: '18.0 km/l', engine: '1330cc Turbo', transmission: 'Manual/CVT', seating: 5 },
  { brand: 'Renault', model: 'Kwid', category: 'Hatchback', priceMin: 4.7, priceMax: 6.5, fuelTypes: 'Petrol', mileage: '22.0 km/l', engine: '999cc', transmission: 'Manual/AMT', seating: 5 },
  { brand: 'MG', model: 'Astor', category: 'SUV', priceMin: 10.6, priceMax: 17.1, fuelTypes: 'Petrol', mileage: '15.2 km/l', engine: '1349cc/1498cc', transmission: 'Manual/CVT', seating: 5 },
  { brand: 'Tata', model: 'Nexon EV', category: 'Electric SUV', priceMin: 12.5, priceMax: 17.2, fuelTypes: 'Electric', mileage: '325 km range', engine: 'Electric Motor', transmission: 'Automatic', seating: 5 },
];

async function seed() {
  try {
    await sequelize.sync();
    await CarCatalog.bulkCreate(cars);
    console.log(`Seeded ${cars.length} cars into catalog`);
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
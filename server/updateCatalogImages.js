const axios = require('axios');
const sequelize = require('./src/config/db');
const CarCatalog = require('./src/models/CarCatalog');
require('dotenv').config();

async function updateImages() {
  try {
    await sequelize.sync();
    const cars = await CarCatalog.findAll();
    console.log(`Found ${cars.length} cars. Fetching images...`);

    for (const car of cars) {
      try {
        const query = `${car.brand} ${car.model} car`;
        const res = await axios.get('https://api.unsplash.com/search/photos', {
          params: { query, per_page: 1 },
          headers: { Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}` },
        });

        const imageUrl = res.data.results[0]?.urls?.regular || null;

        if (imageUrl) {
          car.imageUrl = imageUrl;
          await car.save();
          console.log(`Done: ${car.brand} ${car.model}`);
        } else {
          console.log(`No image found: ${car.brand} ${car.model}`);
        }

        await new Promise((resolve) => setTimeout(resolve, 1200));
      } catch (err) {
        console.log(`Error for ${car.brand} ${car.model}:`, err.message);
      }
    }

    console.log('All done!');
    process.exit(0);
  } catch (err) {
    console.error('Script error:', err);
    process.exit(1);
  }
}

updateImages();
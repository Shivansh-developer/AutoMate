const axios = require('axios');

const getCarNews = async (req, res) => {
  try {
    const response = await axios.get('https://gnews.io/api/v4/search', {
      params: {
        q: 'car launch India',
        lang: 'en',
        country: 'in',
        max: 9,
        apikey: process.env.GNEWS_API_KEY,
      },
    });
    res.json(response.data.articles);
  } catch (error) {
    res.status(500).json({ message: 'Could not fetch news', error: error.message });
  }
};

module.exports = { getCarNews };
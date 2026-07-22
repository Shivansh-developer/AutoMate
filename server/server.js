const app = require('./src/app');
const sequelize = require('./src/config/db');

const PORT = process.env.PORT || 5000;

sequelize.authenticate()
  .then(() => {
    console.log('Database connected');
    return sequelize.sync();
  })
  .then(() => console.log('Tables synced'))
  .catch((err) => console.error('DB error:', err));

app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
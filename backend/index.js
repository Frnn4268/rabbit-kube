const express = require('express');
const sequelize = require('./src/models');
const userRoutes = require('./src/routes/userRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);

sequelize.sync()
  .then(() => console.log('Database connected'))
  .catch(err => console.log('Error: ' + err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

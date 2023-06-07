const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors=require('cors');
const itemRoutes = require('./src/routes/itemRoutes');

const app = express();
app.use(express.json());
app.use(cors());
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.use('/api/items', itemRoutes);

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

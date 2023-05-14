import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fileUpload from 'express-fileupload';

import countryRoutes from './routes/countries.js';
import cityRoutes from './routes/city.js';
import sightRoutes from './routes/sight.js';
import typeRoutes from './routes/type.js';
import continentRoutes from './routes/continent.js';

const app = express();
dotenv.config();

// Constants
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.static('uploads'));

// Routes
app.use('/api/countries', countryRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/sights', sightRoutes);
app.use('/api/types', typeRoutes);
app.use('/api/continents', continentRoutes);

async function connectToDatabase() {
  try {
    app.listen(PORT, () => console.log(`Starting server on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
}

connectToDatabase();

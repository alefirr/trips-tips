import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import countryRoutes from './routes/countries.js';
import cityRoutes from './routes/city.js';
import sightRoutes from './routes/sight.js';

const app = express();
dotenv.config();

// Constants
const PORT = process.env.PORT || 3001;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

// Middlewares
app.use(cors());

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/countries', countryRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/sights', sightRoutes);

async function connectToDatabase() {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.xncg2h5.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
    );
    app.listen(PORT, () =>
      console.log(`Connected to database, starting server on port ${PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
}

connectToDatabase();

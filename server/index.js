import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

async function connectToDatabase() {
  try {
    await mongoose.connect(
      'mongodb+srv://alefir:alefir2248@cluster0.xncg2h5.mongodb.net/Trips&Tips'
    );
    app.listen(3002, () => console.log('Connected to database'));
  } catch (error) {
    console.log(error);
  }
}

connectToDatabase();

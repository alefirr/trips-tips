import Continent from '../models/continent.js';

export const getAllContinents = async (req, res) => {
  try {
    const continents = await Continent.find();
    if (!continents) {
      return res.status(400).json({ message: 'Continents not found' });
    }
    res.json(continents);
  } catch (e) {
    res.status(400).json({
      message: 'Error during getting all continents',
      e: e.message,
    });
  }
};

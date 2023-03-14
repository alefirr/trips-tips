import City from '../models/City.js';

export const addCity = async (req, res) => {
  try {
    const { name, text, country, isCapital, population } = req.body;
    const isAdded = await City.findOne({ name });
    if (isAdded) {
      return res.status(400).json({ message: 'This city already exists' });
    }
    const newCity = new City({
      name,
      text,
      country,
      isCapital,
      population,
    });

    await newCity.save();
    res.json(newCity);
  } catch (e) {
    res.status(400).json({
      message: 'Error occured during adding city',
      e: e.message,
    });
  }
};

export const updateCity = async (req, res) => {
  try {
    const { name, text, _id: id } = req.body;
    const city = await City.findById(id);
    if (city) {
      city.name = name;
      city.text = text;
      await city.save();
      return res.json(city);
    }
    res.status(400).json({ message: 'No such city' });
  } catch (e) {
    res.status(400).json({
      message: 'Error occured during updating city',
      e: e.message,
    });
  }
};

export const getAllCities = async (req, res) => {
  try {
    const cities = await City.find();
    if (!cities) {
      return res.status(400).json({ message: 'No cities' });
    }
    res.json(cities);
  } catch (e) {
    res.status(400).json({
      message: 'Error occured during getting cities',
      e: e.message,
    });
  }
};

export const getCityById = async (req, res) => {
  try {
    const city = await City.findById(req.params.id);
    if (!city) {
      return res.status(400).json({ message: 'No such city' });
    }
    res.json(city);
  } catch (e) {
    res.status(400).json({
      message: 'Error occured during getting city',
      e: e.message,
    });
  }
};

export const removeCity = async (req, res) => {
  try {
    const city = await City.findByIdAndDelete(req.params.id);
    if (!city) {
      return res.status(400).json({ message: 'No such city' });
    }

    res.json({ message: 'City was deleted' });
  } catch (e) {
    res.status(400).json({
      message: 'Error occured during removing city',
      e: e.message,
    });
  }
};

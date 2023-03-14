import Country from '../models/Country.js';

export const addCountry = async (req, res) => {
  try {
    const { name, text, continent } = req.body;
    const isAdded = await Country.findOne({ name });

    if (isAdded) {
      return res.status(400).json({ message: 'This country already exists' });
    }

    const newCountry = new Country({
      name,
      text,
      continent,
    });

    await newCountry.save();
    res.json(newCountry);
  } catch (e) {
    res.status(400).json({
      message: 'Error occured during creation new country',
      e: e.message,
    });
  }
};

export const updateCountry = async (req, res) => {
  try {
    const { name, text, _id: id } = req.body;
    const country = await Country.findById(id);
    if (country) {
      country.name = name;
      country.text = text;
      await country.save();
      return res.json(country);
    }
    res.status(400).json({ message: 'No such country' });
  } catch (e) {
    res.status(400).json({
      message: 'Error occured during editing country',
      e: e.message,
    });
  }
};

export const getAllCountries = async (req, res) => {
  try {
    const countries = await Country.find();
    if (!countries) {
      return res.status(400).json({ message: 'No countries' });
    }
    res.json(countries);
  } catch (e) {
    res.status(400).json({
      message: 'Error occured during getting countries',
      e: e.message,
    });
  }
};

export const getCountryById = async (req, res) => {
  try {
    const country = await Country.findById(req.params.id);
    if (!country) {
      return res.status(400).json({ message: 'No such country' });
    }
    res.json(country);
  } catch (e) {
    res.status(400).json({
      message: 'Error occured during getting country',
      e: e.message,
    });
  }
};

export const removeCountry = async (req, res) => {
  try {
    const country = await Country.findByIdAndDelete(req.params.id);
    if (!country) {
      return res.status(400).json({ message: 'No such country' });
    }

    res.json({ message: 'Country was deleted' });
  } catch (e) {
    res.status(400).json({
      message: 'Error occured during removing country',
      e: e.message,
    });
  }
};

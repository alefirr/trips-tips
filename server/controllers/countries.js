import Country from '../models/Country.js';

const getCountry = (id) =>
  pool.query(`SELECT * FROM COUNTRIES WHERE id = ${id}`)?.rows?.[0];

export const addCountry = async (req, res) => {
  try {
    const { name, text, continent } = req.body;

    const isAdded = await Country.findOne({ name });

    if (isAdded) {
      return res.status(400).json({ message: 'This country already exists' });
    }

    await pool.query(
      `INSERT INTO COUNTRIES (name, text, continent) VALUES ('${name}', '${text}', ${continent})`
    );

    res.json({ name, text, continent });
  } catch (e) {
    res.status(400).json({
      message: 'Error occured during creation new country',
      e: e.message,
    });
  }
};

export const updateCountry = async (req, res) => {
  try {
    const { name, text, id, continent } = req.body;

    const country = await getCountry(id);

    if (country) {
      country.name = name;
      country.text = text;
      country.continent = continent;

      await pool.query(
        `UPDATE COUNTRIES SET name = '${name}', text = '${text}', continent = ${continent} WHERE id = ${id}`
      );

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
    const countries = await pool.query(
      `SELECT * FROM COUNTRIES ORDER BY "name" ASC`
    );

    if (!countries) {
      return res.status(400).json({ message: 'No countries' });
    }

    res.json(countries.rows);
  } catch (e) {
    res.status(400).json({
      message: 'Error occured during getting countries',
      e: e.message,
    });
  }
};

export const getCountryById = async (req, res) => {
  try {
    const country = await getCountry(req.params.id);

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
    const country = await getCountry(req.params.id);

    if (!country) {
      return res.status(400).json({ message: 'No such country' });
    }

    await pool.query(`DELETE FROM COUNTRIES WHERE id = ${req.params.id}`);

    res.json({ message: 'Country was deleted' });
  } catch (e) {
    res.status(400).json({
      message: 'Error occured during removing country',
      e: e.message,
    });
  }
};

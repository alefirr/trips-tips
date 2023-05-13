import query from '../database.js';

const injectCityById = async (id) => {
  const res = await query(`SELECT * FROM CITIES WHERE id = ${id}`);
  return res?.rows?.[0];
};

export const addCity = async (req, res) => {
  try {
    const { name, text, country, isCapital, population } = req.body;

    const isAdded = (
      await query(
        `SELECT * FROM CITIES WHERE name = '${name}' AND country = ${country}`
      )
    )?.rows?.[0];

    if (isAdded) {
      return res.status(400).json({
        message: 'City with such name already exists in this country',
      });
    }

    await query(
      `INSERT INTO CITIES (name, text, country, isCapital, population) VALUES ('${name}', '${text}', ${country}, ${isCapital}, ${population})`
    );

    res.json({
      name,
      text,
      country,
      isCapital,
      population,
    });
  } catch (e) {
    res.status(400).json({
      message: 'Error occured during adding city',
      e: e.message,
    });
  }
};

export const updateCity = async (req, res) => {
  try {
    const { name, text, id, country, isCapital, population } = req.body;

    const nameExists = (
      await query(
        `SELECT * FROM CITIES WHERE name = '${name} AND id != ${id} AND country = ${country}'`
      )
    )?.rows?.[0];

    if (nameExists) {
      return res.status(400).json({
        message: 'City with such name already exists in this country',
      });
    }

    const city = await injectCityById(id);

    if (city) {
      await query(
        `UPDATE CITIES SET name = '${name}', text = '${text}', country = ${country}, isCapital = ${isCapital}, population = ${population} WHERE id = ${id}`
      );

      return res.json({
        name,
        text,
        country,
        isCapital,
        population,
      });
    }

    res.status(400).json({ message: 'No such city' });
  } catch (e) {
    res.status(400).json({
      message: 'Error occured during updating city',
      e: e.message,
    });
  }
};

export const getAllCities = async (_req, res) => {
  try {
    const cities = (await query(`SELECT * FROM CITIES ORDER BY "name" ASC`))
      ?.rows;

    if (!cities?.length) {
      return res.status(400).json({ message: 'No cities!' });
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
    const city = await injectCityById(req.params.id);

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
    const city = await injectCityById(req.params.id);

    if (!city) {
      return res.status(400).json({ message: 'No such city' });
    }

    await query(`DELETE FROM CITIES WHERE id = ${req.params.id}`);

    res.json({ message: 'City was deleted' });
  } catch (e) {
    res.status(400).json({
      message: 'Error occured during removing city',
      e: e.message,
    });
  }
};

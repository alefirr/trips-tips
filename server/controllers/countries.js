import query from '../database.js';

const injectCountryById = async (id) => {
  const res = await query(`SELECT * FROM COUNTRIES WHERE id = ${id}`);
  return res?.rows?.[0];
};

export const addCountry = async (req, res) => {
  try {
    const { name, text, continent_id } = req.body;

    const isAdded = (
      await query(`SELECT * FROM COUNTRIES WHERE name = '${name}'`)
    )?.rows?.[0];

    if (isAdded) {
      return res.status(400).json({ message: 'This country already exists' });
    }

    const id = (
      await query(
        `INSERT INTO COUNTRIES (name, text, continent_id) VALUES ('${name}', '${text}', ${continent_id}) RETURNING id`
      )
    ).rows?.[0]?.id;

    res.json({ id, name, text, continent_id });
  } catch (e) {
    res.status(400).json({
      message: 'Error occured during creation new country',
      e: e.message,
    });
  }
};

export const updateCountry = async (req, res) => {
  try {
    const { name, text, id, continent_id } = req.body;

    const nameExists = (
      await query(
        `SELECT * FROM COUNTRIES WHERE name = '${name} AND id != ${id}'`
      )
    )?.rows?.[0];

    if (nameExists) {
      return res
        .status(400)
        .json({ message: 'Country with such name already exists' });
    }

    const country = await injectCountryById(id);

    if (country) {
      await query(
        `UPDATE COUNTRIES SET name = '${name}', text = '${text}', continent_id = ${continent_id} WHERE id = ${id}`
      );

      return res.json({ name, text, continent_id, id });
    }

    res.status(400).json({ message: 'No such country' });
  } catch (e) {
    res.status(400).json({
      message: 'Error occured during editing country',
      e: e.message,
    });
  }
};

export const getAllCountries = async (_req, res) => {
  try {
    const countries = (
      await query(`SELECT * FROM COUNTRIES ORDER BY "name" ASC`)
    )?.rows;

    if (!countries?.length) {
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
    const country = await injectCountryById(req.params.id);

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
    const country = await injectCountryById(req.params.id);

    if (!country) {
      return res.status(400).json({ message: 'No such country' });
    }

    await query(`DELETE FROM COUNTRIES WHERE id = ${req.params.id}`);

    res.json({ message: 'Country was deleted' });
  } catch (e) {
    res.status(400).json({
      message: 'Error occured during removing country',
      e: e.message,
    });
  }
};

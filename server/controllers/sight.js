import query from '../database.js';

const injectSightById = async (id) => {
  const res = await query(`SELECT * FROM SIGHTS WHERE id = ${id}`);
  return res?.rows?.[0];
};

export const addSight = async (req, res) => {
  try {
    const { img, name, text, city, type } = req.body;

    const isAdded = (
      await query(
        `SELECT * FROM SIGHTS WHERE name = '${name}' AND city = ${city}`
      )
    )?.rows?.[0];

    if (isAdded) {
      return res.status(400).json({
        message: 'The sigth with such name already exists in this city',
      });
    }

    await query(
      `INSERT INTO SIGHTS (name, text, img, type, city) VALUES ('${name}', '${text}', '${img}', '${type}', ${city})`
    );

    res.json({
      name,
      text,
      img,
      type,
      city,
    });
  } catch (e) {
    res.status(400).json({
      message: 'Error occured during adding sight',
      e: e.message,
    });
  }
};

export const updateSight = async (req, res) => {
  try {
    const { name, text, id, type, city, img } = req.body;

    const isAdded = (
      await query(
        `SELECT * FROM SIGHTS WHERE name = '${name}' AND city = ${city} AND id != ${id}`
      )
    )?.rows?.[0];

    if (isAdded) {
      return res.status(400).json({
        message: 'The sight with such name already exists in this city',
      });
    }

    const sight = await injectSightById(id);

    if (sight) {
      await query(
        `UPDATE SIGHTS SET name = '${name}', text = '${text}', type = '${type}', city = ${city}, img = '${img}' WHERE id = ${id}`
      );

      return res.json({
        name,
        text,
        type,
        city,
        img,
      });
    }
    res.status(400).json({ message: 'No such sight' });
  } catch (e) {
    res.status(400).json({
      message: 'Error occured during updating sight',
      e: e.message,
    });
  }
};

export const getAllSights = async (_req, res) => {
  try {
    const sights = (await query(`SELECT * FROM SIGHTS ORDER BY "name" ASC`))
      ?.rows;

    if (!sights?.length) {
      return res.status(400).json({ message: 'No sights!' });
    }

    res.json(sights);
  } catch (e) {
    res.status(400).json({
      message: 'Error occured during getting sights',
      e: e.message,
    });
  }
};

export const getSightById = async (req, res) => {
  try {
    const sight = await injectSightById(req.params.id);

    if (!sight) {
      return res.status(400).json({ message: 'No such sight' });
    }

    res.json(sight);
  } catch (e) {
    res.status(400).json({
      message: 'Error occured during getting sight',
      e: e.message,
    });
  }
};

export const removeSight = async (req, res) => {
  try {
    const sight = await injectSightById(req.params.id);

    if (!sight) {
      return res.status(400).json({ message: 'No such sight' });
    }

    await query(`DELETE FROM SIGHTS WHERE id = ${req.params.id}`);

    res.json({ message: 'Sight was deleted' });
  } catch (e) {
    res.status(400).json({
      message: 'Error occured during removing sight',
      e: e.message,
    });
  }
};

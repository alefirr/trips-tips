import query from '../database.js';

export const getAllTypes = async (_req, res) => {
  try {
    const types = (await query(`SELECT * FROM TYPES ORDER BY "name" ASC`))
      ?.rows;

    if (!types.length) {
      return res.status(400).json({ message: 'No types' });
    }

    res.json(types);
  } catch (e) {
    res.status(400).json({
      message: 'Error occured during getting types',
      e: e.message,
    });
  }
};

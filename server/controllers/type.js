import Type from '../models/Type.js';

export const getAllTypes = async (req, res) => {
  try {
    const types = await Type.find();
    if (!types) {
      return res.json({ message: 'No types' });
    }
    res.json(types);
  } catch (e) {
    res.json({
      message: 'Error occured during getting types',
      e: e.message,
    });
  }
};

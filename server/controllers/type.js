import Type from '../models/Type.js';

export const getAllTypes = async (req, res) => {
  try {
    const types = await Type.find();
    if (!types) {
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

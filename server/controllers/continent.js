export const getAllContinents = async (_req, res) => {
  try {
    const continents = (
      await query(`SELECT * FROM CONTINENTS ORDER BY "name" ASC`)
    )?.rows;

    if (!continents?.length) {
      return res.status(400).json({ message: 'No continents' });
    }

    res.json(continents);
  } catch (e) {
    res.status(400).json({
      message: 'Error during getting all continents',
      e: e.message,
    });
  }
};

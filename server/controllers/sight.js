import query from '../database.js';

const injectSightById = async (id) => {
  const res = await query(`SELECT * FROM SIGHTS WHERE id = ${id}`);
  return res?.rows?.[0];
};

export const addSight = async (req, res) => {
  try {
    const { name, text, city_id, types } = req.body;

    const isAdded = (
      await query(
        `SELECT * FROM SIGHTS WHERE name = '${name}' AND city_id = ${city_id}`
      )
    )?.rows?.[0];

    if (isAdded) {
      return res.status(400).json({
        message: 'The sight with such name already exists in this city',
      });
    }

    const id = (
      await query(
        `INSERT INTO SIGHTS (name, text, city_id) VALUES ('${name}', '${text}', ${city_id}) RETURNING id`
      )
    ).rows?.[0]?.id;

    await query(
      `INSERT INTO SIGHTS_TAGS (sight_id, tag_id) VALUES ${types
        .map((type) => `(${id}, ${type})`)
        .join(', ')}`
    );

    res.json({
      id,
      name,
      types,
      text,
      city_id,
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
    const { name, text, id, types, city_id } = req.body;

    const isAdded = (
      await query(
        `SELECT * FROM SIGHTS WHERE name = '${name}' AND city_id = ${city_id} AND id != ${id}`
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
        `UPDATE SIGHTS SET name = '${name}', text = '${text}', city_id = ${city_id} WHERE id = ${id};
         DELETE FROM SIGHTS_TAGS WHERE sight_id = ${id};
         INSERT INTO SIGHTS_TAGS (sight_id, tag_id) VALUES ${types
           .map((type) => `(${id}, ${type})`)
           .join(', ')}`
      );

      return res.json({
        id,
        name,
        text,
        types,
        city_id,
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

    const getSightTypes = async (id) =>
      (
        await query(
          `SELECT * FROM SIGHTS_TAGS WHERE sight_id = ${id} ORDER BY "tag_id" ASC`
        )
      )?.rows.map((row) => row.tag_id);

    const sigthsTypes = await Promise.all(
      sights.map((sight) => getSightTypes(sight.id))
    );

    res.json(
      sights.map((sight, index) => ({ ...sight, types: sigthsTypes[index] }))
    );
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

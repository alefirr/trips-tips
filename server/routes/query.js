import query from '../database.js';

export default async function (req, res) {
    const { query: queryString } = req.body;

    console.log(queryString);

    const result = await query(queryString);

    res.send(result.rows?.map((row) => row[Object.keys(row)[0]]));
}

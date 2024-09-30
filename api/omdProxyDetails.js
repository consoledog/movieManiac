import {fetchFromOmdb} from "../utils/fetchFromOmdb.js"

export default async function handler(req, res) {
    const { selectedId } = req.query;
    if (!selectedId) {
        return res.status(400).json({ error: 'Selected id is not valid' });
    }
    const { data, error, status } = await fetchFromOmdb('i', selectedId);
    if (error) {
        return res.status(status).json({ error });
    }
    res.status(200).json(data);
}

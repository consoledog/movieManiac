import {fetchFromOmdb} from "../utils/fetchFromOmdb.js"

export default async function handler(req, res) {
    const { search } = req.query;
    if (!search) {
        return res.status(400).json({ error: 'Search term is required' });
    }
    const { data, error, status } = await fetchFromOmdb('s', search);
    if (error) {
        return res.status(status).json({ error });
    }
    res.status(200).json(data);
}

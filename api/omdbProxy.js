const fetch = require('node-fetch');
export const KEY = "467b6a35";

export default async function handler(req, res) {
    const { search } = req.query; // Get the search term from the query string

    const omdbUrl = `http://www.omdbapi.com/?apikey=${KEY}&s=${search}`;

    try {
        const response = await fetch(omdbUrl);
        const data = await response.json();

        // Send the fetched data back to the client
        res.status(200).json(data);
    } catch (error) {
        // If an error occurs, send a 500 status and error message
        res.status(500).json({ error: 'Failed to fetch data from OMDb API' });
    }
}

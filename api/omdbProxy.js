export const KEY = "467b6a35";

export default async function handler(req, res) {
    const { search } = req.query;

    // Ensure the search query is provided
    if (!search) {
        return res.status(400).json({ error: 'Search term is required' });
    }

    const omdbUrl = `http://www.omdbapi.com/?apikey=${KEY}&s=${search}`;

    try {
        const response = await fetch(omdbUrl);

        // Check if the OMDb API returned a valid response
        if (!response.ok) {
            return res.status(response.status).json({ error: 'Failed to fetch from OMDb API' });
        }

        const data = await response.json();

        // Check if the API returned any data
        if (!data || data.Response === 'False') {
            return res.status(404).json({ error: 'No movies found' });
        }

        res.status(200).json(data);
    } catch (error) {
        // Catch any errors and return a 500 status code
        console.error('Error fetching data from OMDb:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
}

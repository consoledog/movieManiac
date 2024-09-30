const KEY = process.env.OMDB_API_KEY;

export async function fetchFromOmdb(queryParam, queryValue) {
    const omdbUrl = `http://www.omdbapi.com/?apikey=${KEY}&${queryParam}=${queryValue}`;

    try {
        const response = await fetch(omdbUrl);

        // Check if the OMDb API returned a valid response
        if (!response.ok) {
            return { error: `Failed to fetch from OMDb API: ${response.statusText}`, status: response.status };
        }

        const data = await response.json();

        // Check if the API returned any data
        if (!data || data.Response === 'False') {
            return { error: 'No movies found', status: 404 };
        }

        return { data, status: 200 };
    } catch (error) {
        console.error('Error fetching data from OMDb:', error);
        return { error: 'Something went wrong', status: 500 };
    }
}

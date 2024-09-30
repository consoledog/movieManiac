import { useState, useEffect } from "react";

const MIN_NO_OF_LETTERS_TO_WRITE = 3;
export function useMovies(typedMovieName, searchTrigger) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (typedMovieName.length < MIN_NO_OF_LETTERS_TO_WRITE) {
            setMovies([]);
            return;
        }

        async function fetchMovies() {
            try {
                setIsLoading(true);
                setError("");

                const res = await fetch(`/api/omdbProxy?search=${typedMovieName}`);
                if (!res.ok) throw new Error("Something went wrong with fetching movies");

                const data = await res.json();
                if (data.Response === "False") throw new Error("Movie not found");

                setMovies(data.Search);
            } catch (err) {
                console.error(err.message);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        }

        fetchMovies();
    }, [searchTrigger]); // Only trigger on Enter press (searchTrigger)

    return { movies, isLoading, error };
}
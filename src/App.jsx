import {useEffect, useState} from "react";
import {NavBar, Logo, Search, NumResults} from "./components/NavBar.jsx";
import Main from "./components/Main.jsx";
import {Divider} from "./reusable_components/Divider.jsx";
import {MovieList} from "./components/MoviesPresented.jsx";
import {WatchedSummary, WatchedMoviesList, MovieDetails} from "./components/MoviesWatched.jsx";
import {ErrorMessage, LoadMessage} from "./reusable_components/Messages.jsx";
import {KEY} from "./config.js";

export default function App() {
    const [typedMovieName, setTypedMovieName] = useState("");
    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [selectedId, setSelectedId] = useState(null);

    function handleSelectMovie(id){
        setSelectedId(selectedId => (id===selectedId?null:id));
    }

    function handleCloseMovie(){
        setSelectedId(null);
    }

    function handleAddWatch(movie){
        setWatched(watched => [...watched, movie]);
        /*TODO: Add a request to add this movie to watchedList database */
    }

    function handleDeleteWatch(id){
        setWatched(watched => watched.filter(movie => movie.imdbID !== id));
    }

    useEffect(() => {
        const controller = new AbortController();

        async function fetchMovies() {
            try {
                setIsLoading(true);
                setError("");
                const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${typedMovieName}`, {signal: controller.signal});
                if (!res.ok) throw new Error("Something went wrong with fetching movies");
                const data = await res.json(); // Corrected res.json call
                if(data.Response === "False") throw new Error("Movie not found");

                setMovies(data.Search);
            } catch (err) {
                console.error(err.message);
                setError(err.message);
            } finally {
                setIsLoading(false); // Ensure loading state is set to false after the fetch or error
            }
        }

        if (typedMovieName.length <3) { // Optional: Avoid fetching when typedMovieName is empty
            setMovies([]);
            setError("");
            return;
        }
        fetchMovies();

        return function(){
            controller.abort();
        }
    }, [typedMovieName]); // Add typedMovieName and KEY as dependencies


    return (
        <>
            <NavBar>
                <Logo/>
                <Search query={typedMovieName} setQuery={setTypedMovieName}/>
                <NumResults movies={movies}/>
            </NavBar>
            <Main>
                <Divider>{/* This divider is related to presented movies */}
                    {isLoading && <LoadMessage/>}
                    {!isLoading && !error && <MovieList movies={movies} onSelectMovie={handleSelectMovie}/>}
                    {error && <ErrorMessage message={error}/>}
                </Divider>
                <Divider>
                    {
                        selectedId ? <MovieDetails  selectedId={selectedId}
                                                    onCloseMovie ={handleCloseMovie}
                                                    onAddWatched={handleAddWatch}
                                                    watched={watched}/> :
                            <>
                                <WatchedSummary watched={watched}/>
                                <WatchedMoviesList  watched ={watched}
                                                    onDeleteWatched={handleDeleteWatch}/>
                            </>
                    }
                </Divider>
            </Main>
        </>
    );
}
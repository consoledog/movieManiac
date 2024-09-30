import {useState} from "react";
import {NavBar, Logo, Search, NumResults, DropDownMenu} from "./components/NavBar.jsx";
import Main from "./components/Main.jsx";
import {Divider} from "./reusable_components/Divider.jsx";
import {MovieList} from "./components/MoviesPresented.jsx";
import {ErrorMessage, LoadMessage} from "./reusable_components/Messages.jsx";
import {useMovies} from "./customHooks/useMovies.js";
import MoviesWatchedDivider from "./components/moviesWatchedList/MoviesWatchedDivider.jsx";
import MoviesWillWatchDivider from "./components/moviesWillWatchList/MoviesWillWatchDivider.jsx";

export default function App() {
    const [typedMovieName, setTypedMovieName] = useState("");
    const [watched, setWatched] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [searchTrigger, setSearchTrigger] = useState(0);
    const { movies, isLoading, error } = useMovies(typedMovieName, searchTrigger);
    /* NavBar -> DropDownMenu */
    const [dropDownMenuSelectedItem, setDropDownMenuSelectedItem] = useState("watched");
    const [willwatch, setWillWatch] = useState([]);

    /* ***************** HANDLERS ***************** */

    function handleSelectMovie(id){
        setSelectedId(selectedId => (id===selectedId?null:id));
    }

    function handleCloseMovie(){
        setSelectedId(null);
    }

    /* Handlers for watched list */
    function handleAddWatch(movie){
        setWatched(watched => [...watched, movie]);
        /*TODO: Add a request to add this movie to watchedList database */
    }
    function handleDeleteWatch(id){
        setWatched(watched => watched.filter(movie => movie.imdbID !== id));
        /*TODO: Add a request to delete this movie from watchedList database */
    }

    /* Handlers for watched list */
    function handleAddWillWatch(movie)
    {
        setWillWatch(willwatch => [...willwatch, movie])
        /*TODO: Add a request to add this movie to willWatchList database */
    }
    function handleDeleteWillWatch(id){
        setWillWatch(willwatch => willwatch.filter(movie => movie.imdbID !== id));
        /*TODO: Add a request to delete this movie from willWatchList database */
    }

    function handleSearch() {
        setSearchTrigger((prev) => (prev + 1)%100);
    }

    return (
        <>
            <NavBar>
                <Logo/>
                <Search query={typedMovieName} setQuery={setTypedMovieName} onSearch={handleSearch}/>
                <NumResults movies={movies}/>
                <DropDownMenu dropDownMenuSelectedItem={dropDownMenuSelectedItem}
                              setDropDownMenuSelectedItem={setDropDownMenuSelectedItem}/>
            </NavBar>
            <Main>
                <Divider>{/* This divider is related to presented movies */}
                    {isLoading && <LoadMessage/>}
                    {!isLoading && !error && <MovieList movies={movies} onSelectMovie={handleSelectMovie}/>}
                    {error && <ErrorMessage message={error}/>}
                </Divider>
                {/* Arbitration between watched and will watch lists */
                    dropDownMenuSelectedItem === "watched"?
                        <MoviesWatchedDivider dropDownMenuSelectedItem={dropDownMenuSelectedItem}
                                              selectedId={selectedId}
                                              handleCloseMovie={handleCloseMovie}
                                              handleAddWatch={handleAddWatch}
                                              watched={watched}
                                              handleDeleteWatch={handleDeleteWatch}
                                              handleAddWillWatch={handleAddWillWatch}
                                              handleDeleteWillWatch={handleDeleteWillWatch}/>
                        :
                        <MoviesWillWatchDivider
                                                dropDownMenuSelectedItem={dropDownMenuSelectedItem}
                                                willWatch={willwatch}
                                                selectedId={selectedId}
                                                handleCloseMovie={handleCloseMovie}
                                                handleAddWatch={handleAddWatch}
                                                watched={watched}
                                                handleAddWillWatch={handleAddWillWatch}
                                                handleDeleteWillWatch={handleDeleteWillWatch}/>
                }

            </Main>
        </>
    );
}
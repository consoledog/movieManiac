import { useEffect, useState } from "react";
import StarRating from "./StartRating.jsx";

const average = (arr) =>
    arr.reduce((acc, cur) => acc + cur / arr.length, 0);

export function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
    const [movie, setMovie] = useState({});
    const [userRating, setUserRating] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
    const watchedUserRating = watched.find((movie) => movie.imdbID === selectedId)?.userRating;
    const {
        Title: title,
        Year: year,
        Poster: poster,
        Runtime: runtime = "N/A",
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre
    } = movie;

    function handleAdd() {
        const newWatchedMovie = {
            imdbID: selectedId,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            runtime: runtime !== "N/A" ? Number(runtime.split(" ").at(0)) : 0,
            userRating: Number(userRating)
        };
        onAddWatched(newWatchedMovie);
        onCloseMovie();
    }
    
    useEffect(() => {
        async function getMovieDetails() {
            try {
                setIsLoading(true);
                const res = await fetch(`/api/omdProxyDetails?selectedId=${selectedId}`);
                if (!res.ok) throw new Error("Error fetching movie details");
                const data = await res.json();
                setMovie(data);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        }

        getMovieDetails();
    }, [selectedId]);

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="leading-[1.4] text-[1.4rem]">
            <header className="flex">
                <button className="absolute top-[0.6rem] left-[0.6rem] h-[3.2rem] aspect-[1] rounded-full border-none bg-white text-background-500 shadow-lg font-sans text-[2.4rem] font-bold cursor-pointer z-[999] flex items-center justify-center"
                        onClick={onCloseMovie}>⬅</button>
                <img src={poster}
                     alt={`Poster of ${title} movie`}
                     className="w-[33%]"/>
                <div className="w-full p-[2.4rem_3rem] bg-background-100 flex flex-col gap-[1.4rem]">
                    <h2>{title}</h2>
                    <p>{released} &bull; {runtime}</p>
                    <p>{genre}</p>
                    <p><span>⭐</span>{imdbRating} IMDb rating</p>
                </div>
            </header>
            <section className="p-[4rem] flex flex-col gap-[1.6rem]">
                {!isWatched ? (
                    <StartRatingBox userRating={userRating} setUserRating={setUserRating} handleAdd={handleAdd}/>
                ) : (
                    <p>❗<strong>Already rated with {watchedUserRating} stars</strong></p>
                )}
                <p>
                    <em><strong className="text-yellow-500">Plot:</strong> {plot}</em>
                </p>
                <p><strong className="text-yellow-500">Starring:</strong> {actors}</p>
                <p><strong className="text-yellow-500">Directed by:</strong> {director}</p>
            </section>
        </div>
    );
}

function StartRatingBox({userRating, setUserRating, handleAdd}) {
    return <div className="bg-background-100 rounded-[0.9rem] p-[2rem_2.4rem] mb-[0.8rem] font-semibold flex
                    flex-col gap-[2.4rem]">
        <StarRating size={24} onSetRating={setUserRating}/>
        {Number(userRating) > 0 && (
            <button className="bg-primary text-text border-none rounded-[10rem] text-[1.4rem] p-[1rem]
                            font-bold cursor-pointer transition-all duration-300 hover:bg-primary-light"
                    onClick={handleAdd}>
                💾 Save to list
            </button>
        )}
    </div>
}

export function WatchedSummary({watched}) {
    const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
    const avgUserRating = average(watched.map((movie) => movie.userRating));
    const avgRuntime = average(watched.map((movie) => movie.runtime));

    return (
        <div className="p-[2.2rem_3.2rem_1.8rem] rounded-[0.9rem] bg-background-100 shadow-lg">
            <h2 className="uppercase text-[1.6rem] mb-[0.6rem]">Movies you watched</h2>
            <div className="flex items-center gap-[2.4rem] text-[1.6rem] font-semibold">
                <p className="flex items-center gap-[0.8rem]">
                    <span>#️⃣</span>
                    <span>NO movies: {watched.length} </span>
                </p>
                <p className="flex items-center gap-[0.8rem]">
                    <span>IMDb:</span>
                    <span>{avgImdbRating.toFixed(2)}</span>
                </p>
                <p className="flex items-center gap-[0.8rem]">
                    <span>User:</span>
                    <span>{avgUserRating.toFixed(2)}</span>
                </p>
                <p className="flex items-center gap-[0.8rem]">
                    <span>🕙</span>
                    <span>{avgRuntime} min</span>
                </p>
            </div>
        </div>
    );
}

export function WatchedMoviesList({ watched, onDeleteWatched }) {
    return (
        <ul className="list-none p-[0.8rem] overflow-auto">
            {watched.map((movie) => (
                <WatchedMovie   key={movie.imdbID}
                                movie={movie}
                                onDeleteWatched={onDeleteWatched}/>
            ))}
        </ul>
    );
}

function WatchedMovie({ movie, onDeleteWatched }) {
    return (
        <li className="cursor-pointer transition-all hover:bg-background-100 relative grid grid-cols-[30rem]
    grid-rows-[auto_auto] gap-[2.4rem] text-[3rem] items-center p-[1.6rem_3.2rem] border-b
    border-background-100">
            <button className="absolute right-[2.4rem] h-[1.8rem] aspect-[1] rounded-full border-none bg-red
                                   text-background-900 text-[0.9rem] font-bold cursor-pointer transition-all duration-300
                                   hover:bg-red-dark"
                    onClick={() => onDeleteWatched(movie.imdbID)}>X
            </button>
            <img src={movie.poster} alt={`${movie.title} poster`}/>
            <h3>{movie.title}</h3>
            <div>
                <p>
                    <span>IMDb ⭐️ </span>
                    <span>{movie.imdbRating}</span>
                </p>
                <p>
                    <span>User 🌟 </span>
                    <span>{movie.userRating}</span>
                </p>
                <p>
                    <span>🕙</span>
                    <span>{movie.runtime} min</span>
                </p>
            </div>
        </li>
    );
}
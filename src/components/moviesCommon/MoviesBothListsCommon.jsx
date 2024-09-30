import { useEffect, useState } from "react";
import StarRating from "../StartRating.jsx";


export function MovieDetails({dropDownMenuSelectedItem, selectedId, onCloseMovie, onAddWatched, watched, handleAddWillWatch, handleDeleteWillWatch}) {
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

    function handleAddWatchedMovie() {
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

    function handleAddWillWatchMovie() {
        const newWillWatchMovie = {
            imdbID: selectedId,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            runtime: runtime !== "N/A" ? Number(runtime.split(" ").at(0)) : 0,
            userRating: Number(userRating)
        };
        handleAddWillWatch(newWillWatchMovie);
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
                {dropDownMenuSelectedItem === "watched" && !isWatched &&
                    (<StartRatingBox userRating={userRating} setUserRating={setUserRating} handleAdd={handleAddWatchedMovie}/>)
                }
                {
                    dropDownMenuSelectedItem === "watched" && isWatched &&
                    (<p>❗<strong>Already rated with {watchedUserRating} stars</strong></p>)
                }
                {
                    dropDownMenuSelectedItem === "will-watch" &&
                    (<AddToListButton handleAdd={handleAddWillWatchMovie}/>)

                }
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
            <AddToListButton handleAdd={handleAdd}/>
        )}
    </div>
}

export function AddToListButton({handleAdd}) {
    return <button className="bg-primary text-text border-none rounded-[10rem] text-[1.4rem] p-[1rem]
                            font-bold cursor-pointer transition-all duration-300 hover:bg-primary-light"
                   onClick={handleAdd}>
        💾 Save to list
    </button>
}
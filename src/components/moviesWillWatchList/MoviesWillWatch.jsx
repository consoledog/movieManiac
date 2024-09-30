import {average} from "../../../utils/utils.js";

export function WillWatchSummary({willWatch}) {
    const avgImdbRating = average(willWatch.map((movie) => movie.imdbRating));
    const avgRuntime = average(willWatch.map((movie) => movie.runtime));

    return (
        <div className="p-[2.2rem_3.2rem_1.8rem] rounded-[0.9rem] bg-background-100 shadow-lg">
            <h2 className="uppercase text-[1.6rem] mb-[0.6rem]">Movies you will Watch</h2>
            <div className="flex items-center gap-[2.4rem] text-[1.6rem] font-semibold">
                <p className="flex items-center gap-[0.8rem]">
                    <span>#️⃣</span>
                    <span>NO movies: {willWatch.length} </span>
                </p>
                <p className="flex items-center gap-[0.8rem]">
                    <span>IMDb:</span>
                    <span>{avgImdbRating.toFixed(2)}</span>
                </p>
                <p className="flex items-center gap-[0.8rem]">
                    <span>🕙</span>
                    <span>{avgRuntime} min</span>
                </p>
            </div>
        </div>
    );
}

export function WillWatchMoviesList({ willWatch, onDeleteWillWatch }) {
    return (
        <ul className="list-none p-[0.8rem] overflow-auto">
            {willWatch.map((movie) => (
                <WillWatchMovie     key={movie.imdbID}
                                    movie={movie}
                                    onDeleteMovie={onDeleteWillWatch}/>
            ))}
        </ul>
    );
}

function WillWatchMovie({ movie, onDeleteMovie }) {
    return (
        <li className="cursor-pointer transition-all hover:bg-background-100 relative grid grid-cols-[30rem]
    grid-rows-[auto_auto] gap-[2.4rem] text-[3rem] items-center p-[1.6rem_3.2rem] border-b
    border-background-100">
            <button className="absolute right-[2.4rem] h-[1.8rem] aspect-[1] rounded-full border-none bg-red
                                   text-background-900 text-[0.9rem] font-bold cursor-pointer transition-all duration-300
                                   hover:bg-red-dark"
                    onClick={() => onDeleteMovie(movie.imdbID)}>X
            </button>
            <img src={movie.poster} alt={`${movie.title} poster`}/>
            <h3>{movie.title}</h3>
            <div>
                <p>
                    <span>IMDb ⭐️ </span>
                    <span>{movie.imdbRating}</span>
                </p>
                <p>
                    <span>🕙</span>
                    <span>{movie.runtime} min</span>
                </p>
            </div>
        </li>
    );
}
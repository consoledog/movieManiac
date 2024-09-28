export function MovieList({movies, onSelectMovie}) {
    return <ul className="list-none p-[0.8rem] overflow-auto">
        {movies?.map((movie) => (
            <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie}/>
        ))}
    </ul>
}

function Movie({movie, onSelectMovie}) {
    return <li className="cursor-pointer transition-all hover:bg-background-100 relative grid grid-cols-[30rem]
                          grid-rows-[auto_auto] gap-[2.4rem] text-[3rem] items-center p-[1.6rem_3.2rem] border-b
                          border-background-100"
        onClick={() => onSelectMovie(movie.imdbID)}>
        <img src={movie.Poster} alt={`${movie.Title} poster`}/>
        <h3>{movie.Title}</h3>
        <div>
            <p>
                <span>🗓</span>
                <span>{movie.Year}</span>
            </p>
        </div>
    </li>
}
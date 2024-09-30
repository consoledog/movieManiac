import {WatchedMoviesList, WatchedSummary} from "./MoviesWatched.jsx";
import {Divider} from "../../reusable_components/Divider.jsx";
import {MovieDetails} from "../moviesCommon/MoviesBothListsCommon.jsx"

export default function MoviesWatchedDivider({dropDownMenuSelectedItem,
                                                 selectedId,
                                                 handleCloseMovie,
                                                 handleAddWatch,
                                                 watched,
                                                 handleDeleteWatch,
                                                 handleAddWillWatch,
                                                 handleDeleteWillWatch})
{
    return <Divider>{/* This divider is related to watched movies list */}
        {
            selectedId ? <MovieDetails  dropDownMenuSelectedItem = {dropDownMenuSelectedItem}
                                        selectedId={selectedId}
                                        onCloseMovie ={handleCloseMovie}
                                        onAddWatched={handleAddWatch}
                                        watched={watched}
                                        handleAddWillWatch={handleAddWillWatch}
                                        handleDeleteWillWatch={handleDeleteWillWatch}/> :
                <>
                    <WatchedSummary watched={watched}/>
                    <WatchedMoviesList  watched ={watched}
                                        onDeleteWatched={handleDeleteWatch}/>
                </>
        }
    </Divider>
}
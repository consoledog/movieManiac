import {Divider} from "../../reusable_components/Divider.jsx";
import {WillWatchMoviesList, WillWatchSummary} from "./MoviesWillWatch.jsx";
import {MovieDetails} from "../moviesCommon/MoviesBothListsCommon.jsx";

export default function MoviesWillWatchDivider({dropDownMenuSelectedItem,
                                                   willWatch,
                                                   selectedId,
                                                   handleCloseMovie,
                                                   handleAddWatch,
                                                   watched,
                                                   handleAddWillWatch,
                                                   handleDeleteWillWatch
                                               })
{
    return <Divider>
        {
            selectedId ? <MovieDetails  dropDownMenuSelectedItem = {dropDownMenuSelectedItem}
                                        selectedId={selectedId}
                                        onCloseMovie ={handleCloseMovie}
                                        onAddWatched={handleAddWatch}
                                        watched = {watched}
                                        handleAddWillWatch={handleAddWillWatch}
                                        handleDeleteWillWatch={handleDeleteWillWatch}/> :
                    <>
                        <WillWatchSummary willWatch={willWatch}/>
                        <WillWatchMoviesList  willWatch ={willWatch}
                                              onDeleteWillWatch={handleDeleteWillWatch}/>
                    </>

        }
    </Divider>
}
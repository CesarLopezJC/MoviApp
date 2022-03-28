import { useEffect, useState } from "react";
import { movieDB } from "../api/movieDB";
import { MovieDBNowPlaying, Result } from '../interces/movieInterface';

interface MoviesState{
    nowPaying: Result[];
    popular: Result[];
    topRated: Result[];
    upcoming: Result[];
}


export const useMovies = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [moviesState, setMoviesState] = useState<MoviesState>({
        nowPaying: [],
        popular: [],
        topRated: [],
        upcoming: [],
    })



    const getMovies = async ()=>{
        const nowPayingPromise  = movieDB.get<MovieDBNowPlaying>('/now_playing');
        const popularPromise    = movieDB.get<MovieDBNowPlaying>('/popular');
        const topRatedPromise   = movieDB.get<MovieDBNowPlaying>('/top_rated');
        const upcomingPromise   = movieDB.get<MovieDBNowPlaying>('/upcoming');

        const resps= await Promise.all([
            nowPayingPromise,
            popularPromise,
            topRatedPromise,
            upcomingPromise
        ]);

        setMoviesState({
            nowPaying:  resps[0].data.results,
            popular:    resps[1].data.results,
            topRated:   resps[2].data.results,
            upcoming:   resps[3].data.results,
        })

        // setPeliculasCine(respNowPlaying.data.results);
        // setPeliculasPopulares(respPopular.data.results);
        // setPeliculasTop(respTop.data.results);

        setIsLoading(false);
    }

    useEffect(() => {
        //now_playing
        getMovies();
    }, [])
    return {
        ...moviesState,
        // nowPaying : moviesState?.nowPaying,
        // popular : moviesState?.popular,
        // topRated : moviesState?.topRated,
        // upcoming : moviesState?.upcoming,
        isLoading,
    }
}

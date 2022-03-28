import { useEffect, useState } from "react"
import { MovieFull } from '../interces/movieInterface';
import { movieDB } from '../api/movieDB';
import { CredistResponse, Cast } from '../interces/credistInterface';

interface MovieDatails{
    isLoading: boolean;
    movifull: MovieFull;
    cast: Cast[];
}



export const useMoviesDatails = (movieId: number) => {
    
    const [state, setstate] = useState<MovieDatails>({
        isLoading: true,
        movifull: undefined!,
        cast: []
    });
    

    const getMovieDatails = async() =>{
        const movieDatailsPromise= movieDB.get<MovieFull>(`/${movieId}`);
        const movieCreditsPromise= movieDB.get<CredistResponse>(`/${movieId}/credits`);

        const [ movieDatailsResp, movieCreditsResp]= await Promise.all ([movieDatailsPromise,movieCreditsPromise]);

        setstate({
            isLoading:false,
            movifull:movieDatailsResp.data,
            cast: movieCreditsResp.data.cast
        });
    }


    useEffect(() => {
        getMovieDatails();
    }, [])


    return{
        ...state
    }
}




// Llamar a la api de forma independiente sin hacer otros llamados 
// const resp= await movieDB.get<MovieFull>(`/${movieId}`);

//         console.log(resp.data.overview);
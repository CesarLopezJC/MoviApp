import axios from "axios"
export const movieDB = axios.create({
    baseURL:'https://api.themoviedb.org/3/movie',
    params:{
        api_key:  '1b6dd3fd5d31229631a273b7dbcb674c',
        language: 'es-ES',

    }
})

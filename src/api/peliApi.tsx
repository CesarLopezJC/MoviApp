import axios from "axios";

const baseURL='https://ultimo-intento-react-peliculas.herokuapp.com/api';

const peliApi=axios.create({baseURL});




export default peliApi;
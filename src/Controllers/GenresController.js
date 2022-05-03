const axios = require('axios');
const { Videogame, Genre } = require('../db');
const { API_KEY } = process.env;

const getGenres = async() => {
    try{
        let getGenres = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);

        const genres = getGenres.data.results.map(el => el.name);

        return genres;
    }
    catch(e){
        return { error: 'Not found.' };
    }
};


module.exports = getGenres;
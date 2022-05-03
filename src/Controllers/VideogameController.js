const axios = require('axios');
const { Videogame, Genre } = require('../db');
const { API_KEY } = process.env;

const getInfoId = async(id) => {
    try{
        let getGameById = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
        getGameById = getGameById.data;
        getGameById = {
            id: getGameById.id,
            image: getGameById.background_image?getGameById.background_image:'https://besthqwallpapers.com/Uploads/8-3-2020/124076/thumb2-404-wallpaper-not-found-violet-sign-4k-violet-brickwall-404-wallpaper-not-found-violet-blank-display.jpg',
            name: getGameById.name,
            description: getGameById.description_raw,
            genres: getGameById.genres.map(el => el.name),
            released: getGameById.released,
            rating: getGameById.rating,
            platforms: getGameById.platforms.map(el => el.platform.name),
            website: getGameById.website
        }
        return getGameById;
    }
    catch(e){
        return 'Not found.';
    }
};


module.exports = getInfoId;
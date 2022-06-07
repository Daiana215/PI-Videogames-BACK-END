const axios = require('axios');
const { Videogame, Genre } = require('../db');
const { API_KEY } = process.env;


const getInfo = async() => {
    try{
        let i = 1;
        let listGames= [];

        while(i < 6) {
            let getApi = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`);

            listGames.push(getApi);

            i++;
        };
        listGames = (await Promise.all(listGames)).map(el => el.data.results.map(el => {
            return({
                id: el.id,
                image: el.background_image,
                name: el.name,
                rating: el.rating,
                genres: el.genres.map(el => el.name),
                platforms: el.platforms.map(el => el.platform.name)
            })
        }));
        let allGames = [];
        listGames.map(el => {allGames = allGames.concat(el)});
        
        return allGames;
    }
    catch(e) {
        console.log(e)
        return [{ error: 'Not found.' }];
    }
};

const getInfoByName = async(game) => {
    try{
        let getGamesNames = await axios.get(`https://api.rawg.io/api/games?search=${game}&key=${API_KEY}`);
        getGamesNames = getGamesNames.data.results.map(el => {
            return {
                id: el.id,
                image: el.background_image?el.background_image:'https://w0.peakpx.com/wallpaper/588/185/HD-wallpaper-404-not-found-red-sign-red-brickwall-404-not-found-red-blank-display-404-not-found-neon-symbol.jpg',
                name: el.name,
                genres: el.genres.map(el => el.name),
            }}
        );
        
        return getGamesNames;
    }
    catch(e){
        return { error: 'Not found.' };
    }
};

const getDB = async() => {
    try{
        let allGamesDB = (await Videogame.findAll({
            attributes: [ 'name', 'image', 'id', 'description', 'released', 'rating', 'platforms', 'website' ],
            include: {
                model: Genre,
                attributes: [ 'name' ],
                through: {
                    attributes: []
                }
            }
        })).map(el => el.toJSON());
        allGamesDB = allGamesDB.map(el => ({
            id: el.id,
            name: el.name,
            image: el.image,
            description: el.description,
            rating: el.rating,
            released: el.released,
            genres: el.Genres.map(e => e.name),
            platforms: el.platforms,
            website: el.website
        }));

        return allGamesDB;
    }
    catch(e){
        return { error: 'Not found.' };
    }
};

const getAllVideogames = async() => {
    return (await getInfo()).concat(await getDB());
};



module.exports = {
    getInfo,
    getInfoByName,
    getDB,
    getAllVideogames
};
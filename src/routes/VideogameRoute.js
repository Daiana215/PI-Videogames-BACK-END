const { Router } = require('express');
const { Videogame, Genre } = require('../db');
const { getDB } = require('../Controllers/VideogamesController');
const getInfoId = require('../Controllers/VideogameController');

const router = Router();

router.get('/:id', async(req, res) => {
    let { id } = req.params;
    
    try{
        if(id.includes('-')){
            const allId = await getDB();
            let gameid = allId.find(el => el.id === id);

            res.status(200).json(gameid);
        }
        else{
            const getGames = await getInfoId(id);

            res.status(200).json(getGames);
        }
    }
    catch(e){
        res.status(404).send('Videogame not found.');
    };
});

router.post('/', async(req, res) => {
    let { name, image, description, released, rating, genres, platforms, website } = req.body;

    try{
        let createVideogame = await Videogame.create({
            name, image, description, released, rating, platforms, website
        });
        
        let genreByDb = await Promise.all(genres.map(async el=> {
            return (await Genre.findOrCreate({
                where: {
                    name: el
                }
            }))[0].dataValues.id;
        }));

        await createVideogame.addGenre(genreByDb);

        let gameCreated = (await Videogame.findOne({
            attributes: [ 'name', 'image', 'id', 'description', 'released', 'rating', 'platforms', 'website' ],
            where: {
                name: name,
            },
            include: {
                model: Genre,
                attributes: [ 'name' ],
                through: {
                    attributes: []
                }
            }
        })).toJSON();
        gameCreated = {
            name: gameCreated.name,
            image: gameCreated.image,
            id: gameCreated.id,
            description: gameCreated.description,
            released: gameCreated.released,
            rating: gameCreated.rating,
            platforms: gameCreated.platforms,
            genres: gameCreated.Genres.map(el => el.name),
            website: gameCreated.website
        };
        res.status(200).json(gameCreated);
    }
    catch(e){
        res.status(404).send('Ups! Sorry, there was an error creating the videogame :(');
    };
});


module.exports = router;
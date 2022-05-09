const { Router } = require('express');
const { Genre } = require('../db');
const getGenres = require('../Controllers/GenresController');

const router = Router();

router.get('/', async(req, res) => {
    try{
        const getGenresGames = await getGenres();
        getGenresGames.forEach(el => {
            Genre.findOrCreate({
                where: {
                    name: el
                }
            })
        });
        
        const allGenres = await Genre.findAll();
        res.status(200).json(allGenres);
    }
    catch(e){
        res.status(404).send('Ups! Sorry, there was an error creating a genres :(')
    };
});


module.exports = router;
const { Router } = require('express');
const { getAllVideogames, getInfoByName, getDB } = require('../Controllers/VideogamesController');

const router = Router();

router.get('/', async (req, res) => {
    const { name } = req.query;

    try{
        if(name){
            let getNames = await getInfoByName(name);
            let getNamesByDb = await getDB();
            getNamesByDb = getNamesByDb.map(el => ({
                id: el.id,
                image: el.image,
                name: el.name,
                genres: el.genres
            }));            
            getNamesByDb = getNamesByDb.filter(el => el.name.includes(name));
            
            const allGames = getNames.concat(getNamesByDb);
        
            allGames
            ? res.status(200).json(allGames)
            : res.status(404).send("We don't have that videogame. Please try entering another name.");
        }
        else {
            const getGames = await getAllVideogames();

            res.status(200).json(getGames);
        }
    }
    catch(e){
        console.log(e)
        res.status(404).send('Videogame not found.');
    }
});



module.exports = router;
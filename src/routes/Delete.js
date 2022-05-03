// const { Router } = require('express');
// const { Videogame, Genre } = require('../db');
// const { getDB } = require('../Controllers/VideogamesController');
// // const getInfoId = require('../Controllers/VideogameController');
// const router = Router();

// router.get('/:id', async(req, res) => {
//     let { id } = req.params;
    
//     try{
//         const allId = await getDB();
//         let gameid = allId.find(el => el.id === id);
        
//         Videogame.destroy({
//             where: {
//                 id: id
//             }
//         }).then(resp => {
//             resp
//             ? res.status(200, '/videogames')
//             : res.status(404).send('Ups! Videogame not found.')
//         })

//         res.status(200).json(gameid);
//     }
//     catch(e){
//         res.status(404).send('Videogame not found.');
//     };
// });
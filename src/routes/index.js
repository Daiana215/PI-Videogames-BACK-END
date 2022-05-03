const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const VideogamesRoute = require('../routes/VideogamesRoute');
const VideogameRoute = require('../routes/VideogameRoute');
const GenresRoute = require('../routes/GenresRoute');
// const deleteVideogame = require('../routes/Delete');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/videogames', VideogamesRoute);
router.use('/videogame', VideogameRoute);
// router.use('/delete', deleteVideogame);
router.use('/genres', GenresRoute);

module.exports = router;

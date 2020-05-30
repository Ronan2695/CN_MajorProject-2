//Entry Point To all the routes.

const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller')

console.log("router loaded");   

//homeroutes
router.get('/',homeController.home);
router.get('/about',homeController.about);

//user routes
router.use('/users', require('./users'))


//for any further routes, access from here
//router.use('/routerName', require('./routerfile'))



module.exports= router;
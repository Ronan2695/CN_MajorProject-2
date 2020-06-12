//Entry Point To all the routes.

const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller')

console.log("router loaded");   

//homeroutes
router.get('/',homeController.home);
router.get('/about',homeController.about);
router.get('/info',homeController.info);

//user routes
router.use('/users', require('./users'))
router.use('/posts',require('./posts'))

//for any further routes, access from here
//router.use('/routerName', require('./routerfile'))



module.exports= router;
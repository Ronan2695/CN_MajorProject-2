//This is the root index file
//Entry Point To all the routes.

const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller')

console.log("router loaded");   

//homeroutes
router.get('/',homeController.home);
router.get('/about',homeController.about);
router.get('/info',homeController.info);
router.use('/likes', require('./likes'))

//route for API's 
router.use('/api', require('./api'))

//user routes
router.use('/users', require('./users'))
//posts
router.use('/posts',require('./posts'))
//comments
router.use('/comments', require('./comments'));

//for any further routes, access from here
//router.use('/routerName', require('./routerfile'))



module.exports= router;
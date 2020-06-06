const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');
const postsController = require('../controllers/post_controller');


router.get('/profile',usersController.profile);
router.get('/post',postsController.posts);
router.get('/edit',usersController.edit)

router.get('/sign-in',usersController.signin)
router.get('/sign-up',usersController.signup)

//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'},
    ),usersController.createSession)


module.exports=router;
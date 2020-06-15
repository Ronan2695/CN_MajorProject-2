const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');
//routed to index.js
// const postsController = require('../controllers/post_controller');


router.get('/profile/:id',passport.checkAuthentication,usersController.profile);
// router.get('/post',postsController.posts);
router.get('/edit',usersController.edit)

//rendering the sign signup page
router.get('/sign-in',usersController.signin)
router.get('/sign-up',usersController.signup)

//signup(creating a user)
router.post('/create',usersController.create)

//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local', //authenticatinf strategy is local
    {failureRedirect:'/users/sign-in'},
    ),usersController.createSession)

router.get('/sign-out', usersController.destroySession);


module.exports=router;
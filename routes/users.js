const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users_controller');
//postcontroller is being required
const postsController = require('../controllers/post_controller');


router.get('/profile',usersController.profile);
router.get('/post',postsController.posts);
router.get('/edit',usersController.edit)

//Signin and Signup pages.
router.get('/sign-in',usersController.signin);
router.get('/sign-up',usersController.signup);

//SIGNUP
router.post('/create', usersController.create);
//SIGNIN
router.post('/create-session', usersController.createSession);

//SIGNOUT
router.get('/sign-out',usersController.signOut);


module.exports=router;
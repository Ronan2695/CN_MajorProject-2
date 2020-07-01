const express = require('express');
const router = express.Router();

const postsAPI = require("../../../controllers/api/v1/posts_api")
const passport= require('passport')
router.get('/', postsAPI.index);

//delete route
//session: false, to prevent session cookies from generating.
router.delete('/:id',passport.authenticate('jwt',{session: false}), postsAPI.destroy);


module.exports= router;
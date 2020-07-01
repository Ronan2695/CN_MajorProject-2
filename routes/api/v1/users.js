const express = require('express');
const router = express.Router();
const usersAPI= require('../../../controllers/api/v1/users_api')

//API-session-creation
router.post('/create-session',usersAPI.createSession);






module.exports= router;
const express = require('express');
const { authController } = require("../../controller");
const router = express.Router();
const { auth } = require("../../middleware/auth");


/**
 * POST /API/auth/login/
 * @summary Checks the provided credentials and starts a secured session
 * @tags Authentication
 * @security BearerAuth
 * @param {SigninCredentials} request.body.required The credentials of the player
 * @return {} 200 - Returns a map associating each game with an excerpt of the scores
 * @return {object} 500 - Unexpected error
 * @return {object} 401 - Bad credentials
 */
router.route('/login').post(authController.login);


/**
 * POST /API/auth/signup/
 * @summary Create a new user and starts a secured session
 * @tags Authentication
 * @security BearerAuth
 * @param {SignupCredentials} request.body.required The username of the new player
 * @return {} 200 - Returns a map associating each game with an excerpt of the scores
 * @return {object} 500 - Unexpected error
 */
router.route('/signup').post(authController.signup);


/**
 * POST /API/auth/logout/
 * @summary Returns an excerpt of the scores of the current player on all games
 * @tags Authentication
 * @security BearerAuth
 * @return {} 200 - Returns a map associating each game with an excerpt of the scores
 * @return {object} 500 - Unexpected error
 */
router.route('/logout').post(authController.logout);



module.exports = router;
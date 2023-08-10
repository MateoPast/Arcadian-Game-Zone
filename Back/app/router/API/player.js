const express = require('express');
const { playerController } = require("../../controller");
const router = express.Router();
const { auth } = require("../../middleware/auth");



/**
 * GET /API/player/favorites
 * @summary Returns the favorites of the current player
 * @tags Favorites
 * @security BearerAuth
 * @return {Game[]} 200 - Returns an array of the favorites of the current player
 * @return {object} 500 - Unexpected error
 */
router.get("/favorites", playerController.getFavorites);

/**
 * POST /API/player/favorites
 * @summary Adds a game to the player's favorites list
 * @tags Favorites
 * @security BearerAuth
 * @param {number} request.body.required The id of the game.
 * @return {Score[]} 200 - Adds the game to the player's favorites list. Returns an array of the favorites of the player.
 * @return {object} 500 - Unexpected error
 */
router.post("/favorites", playerController.postFavorites);

/**
 * DELETE /API/player/favorites
 * @summary Deletes a game from the player's favorites list
 * @tags Favorites
 * @security BearerAuth
 * @param {number} request.body.required The id of the game
 * @return {Score[]} 200 - Deletes the game from the player's favorites list. Returns an array of the favorites of the player.
 * @return {object} 500 - Unexpected error
 */
router.patch("/favorites", playerController.patchFavorites);


/**
 * GET /API/player
 * @summary Gets the current player informations
 * @tags User
 * @security BearerAuth
 * @return {FullProfile} 200 - Returns the current player informations
 * @return {object} 500 - Unexpected error
 */
router.get("/",auth, playerController.getPlayer);


// TODO veil on multipart form data and node
/**
 * PATCH /API/player
 * @summary Updates the current player informations
 * @tags User
 * @security BearerAuth
 * @param {SignupCredentials} request.body.required All the players information that need to change + password
 * @return {Player} 200 - Updates the current player informations. Returns the player informations.
 * @return {object} 500 - Unexpected error
 */

router.patch("/",auth, playerController.patchPlayer);

/**
 * DELETE /API/player
 * @summary Deletes the user's account
 * @tags User
 * @security BearerAuth
 * @return {object} 200 - User deleted.
 * @return {object} 500 - Unexpected error
 */
router.patch("/", playerController.deletePlayer);


module.exports = router;
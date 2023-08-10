const express = require('express');
const { gamesController } = require("../../controller");
const router = express.Router();




/**
 * GET /API/games/{id}
 * @summary Returns a specific game's informations
 * @tags Games
 * @param {number} id.path.required The id of the game
 * @return {Game} 200 - Returns the game information
 * @return {object} 500 - Unexpected error
 */
router.get("/:id([0-9]+)", gamesController.getGame);

/**
 * GET /API/games
 * @summary Return all available games
 * @tags Games
 * @return {array<Game>} 200 - Lists games
 * @return {Error} 500 - Unexpected error
 */
router.get("/", gamesController.getAllGames);

module.exports = router;
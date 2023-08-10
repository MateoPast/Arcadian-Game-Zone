const express = require('express');
const { scoresController } = require("../../controller");
const router = express.Router();
const { auth } = require("../../middleware/auth");


/**
 * GET /API/scores/player/
 * @summary Returns an excerpt of the scores of the current player on all games
 * @tags Scores
 * @return {PlayerScores} 200 - Returns a map associating each game with an excerpt of the scores
 * @return {object} 500 - Unexpected error
 */
router.get("/player",auth, scoresController.getPlayerRecap);


/**
 * GET /API/scores/{game}
 * @summary Returns an excerpt of the scores of the current player on a given game
 * @tags Scores
 * @param {number} game.path.required The id of the game
 * @return {Score[]} 200 - Returns an excerpt of the scores of the specified game
 * @return {object} 500 - Unexpected error
 */
router.get("/:game", scoresController.getGameScores);

/**
 * POST /API/scores/{game}
 * @summary Create an highscore entry when a player finishes a game for the first time. Returns an excerpt of the scores of the player on the game.
 * @tags Scores
 * @security BearerAuth
 * @param {number} game.path.required The id of the game
 * @param {number} request.body.required The score achieved by the player
 * @return {Score[]} 200 - Returns an excerpt of the scores of the specified game
 * @return {object} 400 - The score entry for this player already exists. Use PATCH instead.
 * @return {object} 500 - Unexpected error
 */
router.post("/:game",auth, scoresController.postGameScores);

/**
 * PATCH /API/scores/{game}
 * @summary Updates the highscore entry of a player on a game. Returns an excerpt of the scores of the player on the game.
 * @tags Scores
 * @security BearerAuth
 * @param {number} game.path.required The id of the game
 * @param {number} request.body.required The score achieved by the player
 * @return {Score[]} 200 - Returns an excerpt of the scores of the specified game
 * @return {object} 400 - The score entry for this player does not exist. Use POST instead.
 * @return {object} 500 - Unexpected error
 */
router.patch("/:game", scoresController.patchGameScores);


/**
 * GET /API/scores
 * @summary Returns an excerpt of the global highscores
 * @tags Scores
 * @return {Score[]} 200 - Returns an excerpt of the global highscores
 * @return {object} 500 - Unexpected error
 */
router.get("/", scoresController.getGlobalHighscores);

module.exports = router;
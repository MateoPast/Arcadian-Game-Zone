/*****************************************/
/*        API router configuration       */
/*****************************************/


/**
 * A game 
 * @typedef {object} Game
 * @property {string} name.required - Name of the game
 * @property {string} game_url.required - Url slug of the game
 * @property {string} image_url.required - Url slug of the thumbnail of the game
 */

/**
 * A User 
 * @typedef {object} SignupCredentials
 * @property {string} name - Login of the player
 * @property {string} email - Email of the user
 * @property {string} avatar_url - Slug of the avatar of the player
 * @property {string} new_password - The new password of a user
 * @property {string} password - The (current, if it exists) password of the user
 */

/**
 * A User 
 * @typedef {object} SigninCredentials
 * @property {string} login.required - Login of the player
 * @property {string} password.required - Password of the user
 */

/**
 * A User 
 * @typedef {object} FullProfile
 * @property {string} name.required - Login of the player
 * @property {string} email.required - Email of the user
 * @property {string} avatar_url.required - Slug of the avatar of the player
 */

/**
 * A Player 
 * @typedef {object} Player
 * @property {string} name.required - Login of the player
 * @property {string} avatar_url.required - Slug of the avatar of the player
 */

/**
 * A Score 
 * @typedef {object} Score
 * @property {number} score.required - The score
 * @property {Player} player.required - The player
 */

/**
 * A Score-Game pair
 * @typedef {object} ScoreGamePair
 * @property {Score} score.required - The score
 * @property {Game} game.required - The game
 */

/**
 * A map that associates game names to scores
 * @typedef {Dictionary<ScoreGamePair>} PlayerScores
 */


const express = require("express");
const router = express.Router();

const authRouter = require("./auth");
router.use("/auth", authRouter);

const playerRouter = require("./player");
router.use("/player", playerRouter);

const scoresRouter = require("./scores");
router.use("/scores", scoresRouter);

const gamesRouter = require("./games");
router.use("/games", gamesRouter);

const APIErrorRouter = require("./error");
router.use("*", APIErrorRouter);


module.exports = router;
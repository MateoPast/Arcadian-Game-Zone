/************************************************/
/*        Main controllers configuration        */
/************************************************/

const authController = require("./auth");
const playerController = require("./player");
const scoresController = require("./scores");
const gamesController = require("./games");

module.exports = { authController, playerController, scoresController, gamesController };
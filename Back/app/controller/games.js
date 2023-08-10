const errorController = require('./error');
const Game = require('./models/game');

const controller = {
    async getGame(req, res){
        if (req.params?.id == null)
            errorController.error_message(req, res, 'parameter `:id` missing', 422);

        try {
            const game = await Game.findById(req.params.id);
            res.json(game);
        } catch (error) {
            errorController.unknown_error(req, res, error)
        }
    },
    
    async getAllGames(req, res){
        try {
            const game = await Game.findAll();
            res.json(game);
        } catch (error) {
            errorController.unknown_error(req, res, error)
        }
    }
};

module.exports = controller;
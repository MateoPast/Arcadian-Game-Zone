const errorController = require('./error');
const Scores = require('./models/scores');

const controller = {
    async getPlayerRecap(req, res){
        if (req.user == null) {
            return errorController.error_message(req, res, 'Incorrect authentication.', 401);
        }
        
        try {
            const recap = await Scores.recap(req.user.id);
            res.json(recap);
        } catch (error) {
            errorController.unknown_error(req, res, error);
        }
    },

    // async getGameScores(req, res){
    //     if (req.user == null || req.params.game == null) {
    //         return errorController.error_message(req, res, 'Incorrect arguments or authentication.', 400);
    //     }
        
    //     try {
    //         const recap = await Scores.findByPlayerIdAndGameId(req.user.id, req.params.game);
    //         res.json(recap);
    //     } catch (error) {
    //         errorController.unknown_error(req, res, error);
    //     }
    // },

    async getGameScores(req, res){
        if (req.params.game == null) {
            return errorController.error_message(req, res, 'Incorrect arguments or authentication.', 400);
        }
        
        try {
            const recap = await Scores.findByGameId(req.params.game);
            res.json(recap);
        } catch (error) {
            errorController.unknown_error(req, res, error);
        }
    },

    // async postGameScores(req, res){
    //     console.log(req.user, "requser")
    //     console.log(req.params.game, "game")
    //     console.log(req.body, "reqbody")
    //     if (req.user == null || req.params.game == null) {
    //         return errorController.error_message(req, res, 'Incorrect arguments or authentication.', 400);
    //     }
        
    //     try {
    //         const score = await Scores.findByPlayerIdAndGameId(req.user.id, req.params.game);
    //         console.log(score)
    //         console.log(req.params.game)
    //         gameId = req.params.game
    //         if (score == null) {
    //             const new_score = new Scores({'score': req.body.score, 'player_id': req.user.id, 'game_id': gameId});
    //             new_score.insert();
    
    //             const recap = await Scores.findByPlayerIdAndGameId(req.user.id, req.params.game);
    //             res.json(recap);
    //         } else {
    //             errorController.error_message(req, res, 'The score entry for this player already exists. Use PATCH instead.', 400);
    //         }
    //     } catch (error) {
    //         errorController.unknown_error(req, res, error);
    //     }
    // },

    async postGameScores(req, res){
        console.log(req.user, "requser")
        console.log(req.params.game, "game")
        console.log(req.body, "reqbody")
        if (req.user == null || req.params.game == null) {
            return errorController.error_message(req, res, 'Incorrect arguments or authentication.', 400);
        }
        
        try {
            console.log(req.body.score)
            console.log(req.params.game)
            gameId = req.params.game
            
                const new_score = new Scores({'score': req.body.score, 'player_id': req.user.id, 'game_id': gameId});
                new_score.insert();
    

                res.status(200).json({message: "succes insert"});
        } catch (error) {
            errorController.unknown_error(req, res, error);
        }
    },

    async patchGameScores(req, res){
        if (req.user == null || typeof req.body !== 'number' || req.params.game == null) {
            return errorController.error_message(req, res, 'Incorrect arguments or authentication.', 400);
        }
        
        try {
            const score = await Scores.findByPlayerIdAndGameId(req.user.id, req.params.game);
            if (score == null) {
                errorController.error_message(req, res, 'The score entry for this player does not exist. Use POST instead.', 400);
            }
            score.score = req.body;
            score.update();

            const recap = await Scores.findByPlayerIdAndGameId(req.user.id, req.params.game);
            res.json(recap);
        } catch (error) {
            errorController.unknown_error(req, res, error);
        }
    },

    async getGlobalHighscores(req, res){
        try {
            const recap = await Scores.highscore();
            res.json(recap);
        } catch (error) {
            errorController.unknown_error(req, res, error);
        }
    }
};

module.exports = controller;
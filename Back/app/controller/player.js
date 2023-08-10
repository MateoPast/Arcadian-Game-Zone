const errorController = require('./error');
const Player = require('./models/player');
const Game = require('./models/player');
const bcrypt = require('bcrypt');

const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/; 

const controller = {
    async getFavorites(req, res){
        try {

            res.json({});

        } catch (error) {
            errorController.unknown_error(req, res, error)
        }
    },
    
    async postFavorites(req, res){
        try {
            res.json({});
        } catch (error) {
            errorController.unknown_error(req, res, error)
        }
    },
    
    async patchFavorites(req, res){
        try {
            res.json({});
        } catch (error) {
            errorController.unknown_error(req, res, error)
        }
    },
    

    async getPlayer(req, res){
        if (req.user?.id == null)
            errorController.error_message(req, res, 'parameter `:id` missing', 422);

        try {
     
            const player = await Player.findById(req.user.id);
            player.password = '';
            res.json(player);

        } catch (error) {
            errorController.unknown_error(req, res, error)
        }
    },


    // async getPlayer(req, res){
    //     if (req.params?.id == null)
    //         return errorController.error_message(req, res, 'parameter `:id` missing', 422);

    //     try {
    //         const game = await Game.findById(req.params.id);
    //         res.json(game);
    //     } catch (error) {
    //         errorController.unknown_error(req, res, error)
    //     }
    // },
    
    async patchPlayer(req, res){
        try {
            const player = await Player.findById(req.user.id);
            console.log(player)
            console.log(req.body)
            if (!player) {
                errorController.error_message(req, res, 'player not found', 404);
            }
            if (req.body.user_name && req.body.user_name !== "") {
                req.body.user_name = req.body.user_name.replace(/ /g, "");
                console.log(req.body.user_name);
              }

            if (req.body.mail !== "" && req.body.mail) {

                console.log(req.body.mail)
                req.body.mail = req.body.mail.replace(/ /g, "")
                 }
                 console.log(req.body.user_name)
            // Pour chaque clés on vérifie qu'il y a eu un changement
            if (req.body.user_name) {
                console.log(req.body.user_name)
                player.user_name = req.body.user_name;
            }

            if (req.body.mail) {
                player.mail = req.body.mail
            }

            if (req.body.avatar_url) {
                player.avatar_url = req.body.avatar_url
            } 
            // Si il souhaite modifier son password je le recrypt
            if (req.body.password) {

                if (!regexPassword.test(req.body.password)) {

                    return res.status(401).json({error: 'Votre mot de passe est invalide, il doit contenir une minuscule, une majuscule, un nombre, un caractère special et 8 charactères minimum'});
                  }
                const encryptedPassword = await bcrypt.hash(req.body.password, 10);
                player.password = encryptedPassword
            }

            await player.update();

            player.password = ''

            res.json(player);
        } catch (error) {
            errorController.unknown_error(req, res, error)
        }
    },
    
    async deletePlayer(req, res){
        try {
          const player = await Player.findById(req.user.id)
          player.delete()
        res.json({});
        } catch (error) {
            errorController.unknown_error(req, res, error)
        }
    }
};


module.exports = controller;
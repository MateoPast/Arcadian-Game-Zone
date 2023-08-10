const Player = require('../controller/models/player');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const errorController = require('./error');


// RegexPassword -> il doit contenir une minuscule, une majuscule, un nombre, un caractère special et 8 charactères minimum
const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/; 

const controller = {
    async login(req, res){
        const { password } = req.body;
        const { mail } = req.body;
        console.log(req.body)
        console.log(mail)
        // const { rememberMe } = req.body;
      
        if(!password || !mail) {
          return res.status(401).json({error: "Champs mail ou password vide!"})
        }
      try {
        const user = await Player.findByEmail(mail);
    
        // on verifie que l'utilisateur avec cet email existe
        if (!user) {
          //return res.send('error: "Cet email n\'existe pas."');
          return res.status(401).json({error: "Cet Email n\'existe pas"});
          
        }
    
        // on verifie que les 2 hash de mot de passe sont les mêmes
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
          //return res.send("error: 'Le mot de passe est invalide.'");
          return res.status(401).json({error: 'Le mot de passe est invalide.'});
        }
        
        console.log(user.user_name, user.id);
        const header = req.headers['authorization']
        console.log(header)

        const askToken = await controller.generateToken(user.id);

        // On créer le cookie contenant le JWT 
        // Si les cookies deviennent chiant, envoyer directement le token dans la response
        // res.cookie(
        //     "access_token",
        //     askToken.access_token,
        //     { 
        //         httpOnly: true,
        //         secure: false,
        //         maxAge: 360000000,
        //         sameSite: 'Lax'
                 // samesite: 'none' marche que en HTTPS
        //     }
        // );

        res.json({
            logged: true,
            userId: user.id,
            //verified: user.verified,
            accessTokenExpiresIn: 9000000000,
            xsrfToken: askToken.xsrfToken,
            access_token: askToken.access_token,
            status: "success"
        });
        //res.status(200).json({message: "connecté", status: "success"});
      }  catch (error) {
        errorController.unknown_error(req, res, error)
    }
    },

    async generateToken(userId) {

        const xsrfToken = crypto.randomBytes(64).toString('hex');

        const jwtContent = {
            userId,
            xsrfToken
        };

        const jwtOptions = {

            //audience: 'http://localhost:5000',
            algorithm: 'HS256',
            expiresIn: '9000000000',
            //subject: userId.toString(),
            //issuer: 'http://localhost:8080'

        };

        const access_token = jwt.sign(
            jwtContent,
            process.env.TOKEN_KEY,
            jwtOptions
        );

        const tokens = {

            access_token,
            xsrfToken

        };

        return tokens;

    },

    // A SUREMENT FAIRE EN FRONT !
    
    async logout(req, res){
      res.clearCookie("access_token");
      res.json({ message: "Déconnecté avec succès" });
    },

    async signup(req, res){
        const { body } = req;

        if(!body.user_name || !body.mail) {
            return res.status(401).json({error: "Champs username ou password vide"})
        }
    
        // on verifie que user_name, email ont une valuer, et que cette valeur n'est pas composé que d'espace blanc
        // trim vire les espace blanc au debut et à la fin https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
        if (!body.user_name.trim() || !body.mail.trim()) {
          return res.status(401).json({error:"Tout les informations n'ont pas été transmises"});
        }
    
        // on verifie que l'email est valide
        // if (!emailValidator.validate(body.email)) {
        //   return res.render('signup', {
        //     error: "Votre email n'est pas valide",
        //   });
        // }
        // on verifie que l'user_name n'est pas déjà utilisé
        try {
        const userUsernameResult = await Player.findByUsername(body.user_name);
        if (userUsernameResult) {
          return res.status(401).json({error: 'Votre pseudo est déjà utilisé'});
        }
    
        // on verifie que l'email n'est pas déjà utilisé
        const userEmailResult = await Player.findByEmail(body.mail);
        if (userEmailResult) {
          return res.status(401).json({error: 'Votre email est déjà utilisé'});
        }
    
        // on verifie que le mot de passe est valide
        if (!regexPassword.test(body.password)) {
          return res.status(401).json({error: 'Votre mot de passe est invalide, il doit contenir une minuscule, une majuscule, un nombre, un caractère special et 8 charactères minimum'});
        }
    
        // on verifie que la repetition du mot de passe est égale au mot de passe !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! A DECOMMENTER POUR UNE CONFIRMATION DE PASSWORD
        // if (body.password !== body.passwordConfirm) {
        //   return res.send("error: 'Le mot de passe et sa confirmation ne correspondent pas'");
        // }
    
        // on hash le mot de passe avant de le stocker
        const encryptedPassword = bcrypt.hashSync(body.password, 10);
        console.log(encryptedPassword);
        const newUser = new Player({
          user_name: body.user_name.trim(), // avec trim on nettoie les espace avant et après
          mail: body.mail.trim().toLowerCase(),
          // password: body.password, STOOOOOOOPPPPPP ON NE STOCKE PAS LE MOT DE PASSE EN CLAIR
          password: encryptedPassword,
        });
        await newUser.insert();

        const token = await controller.generateToken(newUser.id)
        
        console.log(newUser.id)

        res.json({
          user_name: newUser.user_name,
          access_token: token.access_token,
          status: "success"
        });
        
    
      } catch (error) {
        errorController.unknown_error(req, res, error)
      }
    }
};

module.exports = controller;
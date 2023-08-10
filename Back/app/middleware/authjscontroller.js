const generateBasicController = require('../utils/generateBasicController');
const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { disconnect } = require('process');

// regexPassword va nous permettre de verifier qu'un string possède bien:
// une minuscule, une majuscule, un nombre, un caractère special et 8 characère minimum
const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

const basicController = generateBasicController(User);

const userController = {
    ...basicController,

    async createUser(req, res) {
        const { body } = req;
    
        // on verifie que firstname, lastname et email ont une valuer, et que cette valeur n'est pas composé que d'espace blanc
        // trim vire les espace blanc au debut et à la fin https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
        if (!body.firstname.trim() || !body.lastname.trim() || !body.email.trim()) {
          return res.send( "Tout les informations n'ont pas été transmises",
          );
        }
    
        // on verifie que l'email est valide
        // if (!emailValidator.validate(body.email)) {
        //   return res.render('signup', {
        //     error: "Votre email n'est pas valide",
        //   });
        // }
    
        // on verifie que l'email n'est pas déjà utilisé
        const userEmailResult = await User.findOne({
          where: {
            email: body.email,
          },
        });
        if (userEmailResult) {
          return res.send("error: 'Votre email est déjà utilisé'");
        }
    
        // on verifie que le mot de passe est valide
        if (!regexPassword.test(body.password)) {
          return res.send("error: 'Votre mot de passe est invalide, il doit contenir une minuscule, une majuscule, un nombre, un caractère special et 8 charactères minimum'",
          );
        }
    
        // on verifie que la repetition du mot de passe est égale au mot de passe
        if (body.password !== body.passwordConfirm) {
          return res.send("error: 'Le mot de passe et sa confirmation ne correspondent pas'");
        }
    
        // on hash le mot de passe avant de le stocker
        const encryptedPassword = bcrypt.hashSync(body.password, 10);
        console.log(encryptedPassword);
        const newUser = new User({
          firstname: body.firstname.trim(), // avec trim on nettoie les espace avant et après
          lastname: body.lastname.trim(),
          email: body.email.trim(),
          // password: body.password, STOOOOOOOPPPPPP ON NE STOCKE PAS LE MOT DE PASSE EN CLAIR
          password: encryptedPassword,
        });
        await newUser.save();
        res.json({firstname: newUser.firstname});
      },
  
    
      async login(req, res) {
        const { password } = req.body;
        const { email } = req.body;
        console.log(req.body)
        console.log("test")
        // const { rememberMe } = req.body;
    
        const user = await User.findOne({
          where: { email },
        });
    
        // on verifie que l'utilisateur avec cet email existe
        if (!user) {
          return res.send('error: "Cet email n\'existe pas."');
        }
    
        // on verifie que les 2 hash de mot de passe sont les mêmes
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
          return res.send("error: 'Le mot de passe est invalide.'");
        }
        
        console.log(user.id);


        const askToken = await userController.generateToken(user.id);

        /* On créer le cookie contenant le JWT */
        res.cookie(
            "access_token",
            askToken.access_token,
            {
                httpOnly: true,
                secure: true,
                maxAge: 3600000,
                sameSite: 'none'
            }
        );

        res.json({
            logged: true,
            userId: user.id,
            //verified: user.verified,
            accessTokenExpiresIn: 900000,
            xsrfToken: askToken.xsrfToken
        });
        // console.log(req.session,"req.session !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
      },

      logout (req,res) {
        res.clearCookie('access_token');
        console.log("clearcookie");

                      // A VERIFIER SI ENCORE UTILES !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // if(req.session) {
          
        //   console.log(req.session)
        //   res.clearCookie('access_token');
        //   req.session.destroy()   //req.user.destroy() !!!! DELETE L'USER A LA PLACE DE LE DECO !!!!!!!!!
        //   console.log(req.user)
        // } 
        res.json({userIsConnect: "Cookie clear user disconnect"})
                      
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
            expiresIn: '900000',
            subject: userId.toString(),
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

    }
}

module.exports = userController
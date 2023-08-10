const Player = require('../controller/models/player');
const jwt = require('jsonwebtoken');

const authMiddleware = {
    
      auth: async (req, res, next) => {

        try {

            const {cookies, headers} = req;
        //   console.log(req.cookies)
        //     /* On vérifie que le JWT est présent dans les cookies de la requête */
        //     if (!cookies || !cookies.access_token) {

        //         return res.status(401).json({message: "Missing token in cookie"});

        //     }

            // const accessToken = cookies.access_token;
            // console.log(accessToken)
            // /* On vérifie que le token CSRF est présent dans les en-têtes de la requête */
            // if (!headers || !headers['x-xsrf-token']) {

            //     return res.status(401).json({message: "Missing XSRF token in headers"});

            // }

            // const xsrfToken = headers['x-xsrf-token'];
            // console.log("1")
            // /* On vérifie et décode le JWT à l'aide du secret et de l'algorithme utilisé pour le générer */
            // const decodedToken = jwt.verify(
            //     accessToken,
            //     process.env.TOKEN_KEY,
            //     // {
            //     //     algorithms: "HS256"
            //     // }
            // );

             const token = headers['authorization'];
             console.log(token)
             if(token) {
                jwt.verify(token, process.env.TOKEN_KEY, (err, decoded)=> {
                    if (err) {
                        return res.status(401).json({error: `Token non valide`});
                    } else {
                        req.user = decoded
                        console.log(req.user, "DECODED!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
                        req.user.id = decoded.userId;
                        console.log(req.user.id)
                        next()
                    }
                })
             } else {
                return res.status(401).json({ message: 'No token provided' });
             }
            // console.log("1")
            // /* On vérifie et décode le JWT à l'aide du secret et de l'algorithme utilisé pour le générer */
            // const decodedToken = jwt.verify(
            //     accessToken,
            //     process.env.TOKEN_KEY,
            //     // {
            //     //     algorithms: "HS256"
            //     // }
            // );

              console.log("2")

            /* On vérifie que le token CSRF correspond à celui présent dans le JWT  */
            // if (xsrfToken !== decodedToken.xsrfToken) {

            //     return res.status(401).json({message: 'Bad xsrf token'});

            // }
           // A TESTER MAIS MARCHE NORMALEMENT, PENSER A METTRE SUBJECT DANS JWToption pour le .sub et verifier si le password n'est plus dans req.user(vraiment utile ?)
            /* On vérifie que l'utilisateur existe bien dans notre base de données */

            // const userId = decodedToken.sub;

            // a vérif si vraiment utile !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            // const user = await Player.findById(userId); 
            // if (!user || user === null) {

            //     return res.status(401).json({message: `User ${userId} not exists`});

            // } 

            // req.user = user;

            // delete req.user.password;

            // /* On passe l'utilisateur dans notre requête afin que celui-ci soit disponible pour les prochains middlewares */
            // req.user = user;

            // /* On appelle le prochain middleware */
            // return next();

        } catch (err) {

            return res.status(500).json({message: "Internal error"});

        }

    }

      

    }

module.exports = authMiddleware
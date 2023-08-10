const Scores = require ('./app/controller/models/scores');
const Player = require('./app/controller/models/player');
const Games = require('./app/controller/models/game');
const bcrypt = require('bcrypt');

(async () => {

//   const players = await Player.findAll();



// POUR CRYPTE LES MDP VUE QUE NON CRYPTE DANS LE SEEDING !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 for(let i = 0; i < 20; i++ ) {
    const playerEmail = await Player.findByEmail(`mailtest${i+1}@mail.com`);
    playerEmail.password = bcrypt.hashSync(playerEmail.password, 10)
    playerEmail.update()
 }
 console.log("mdp crypté")
// FIN DU CRYPTAGE MDP !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


//   playerEmail.password = 'updatedPassword'
//   playerEmail.update()
//   playerEmail.delete()
//  const newPlayer = new Player({user_name:'TestModel16', mail: 'mailtestmodel16@mail.com', password:'TestModelPassword', avatar_url: 'testModelAvatarUrl'});  
//  console.log(newPlayer)
//     await newPlayer.insert();
//     console.log(newPlayer)
  //console.log(players);
  //console.log(playerEmail)

  // const scores = await Scores.highscore();
  // console.log(scores)


  // const newScore = new Scores({score: 12345, player_id: 1, game_id: 2})
  // newScore.insert()

  // const scores2 = await Scores.findByPlayerIdAndGameId(5, 6);
  // scores2.score = 1234
  // console.log(scores2)
  // scores2.update()
  // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', scores2)
  
// const games = await Games.findAll();
// console.log(games)

const playerEmail = await Player.findByEmail('mailtest1@mail.com')
console.log(playerEmail)


})()

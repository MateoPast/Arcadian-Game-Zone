const client = require('../../dbClient');
const { CoreModel, Player, Game } = require('./');

class Scores extends CoreModel {
    score;
    player;
    game;

    static tableName = 'score';

    constructor(obj) {
        super(obj);
        this.score = obj.score;
        this.player_id = obj.player_id;
        this.game_id = obj.game_id

        this.player = new Player({
          id: obj.player_id,
          user_name: obj.user_name,
          avatar_url: obj.player_avatar_url
        });

        this.game = new Game({
          id: obj.game_id,
          name: obj.name,
          image_url: obj.game_image_url
        });
    }
    // Renvoie tous les scores totaux des meilleurs joueurs
    static async highscore() {
        const { rows } = await client.query(`SELECT * FROM highscore`);
        
        return rows.map(rawData => new this(rawData));    
    }

    // SELECT SUM(score) as score, user_name, player_id, player_avatar_url, -1 AS game_id FROM "highscore" GROUP BY user_name, player_id, player_avatar_url ORDER BY score DESC

    // `SELECT SUM(score) as score, user_name, player_id, player_avatar_url, -1 AS game_id FROM "highscore" GROUP BY user_name, player_id, player_avatar_url ORDER BY score DESC`
    //  SELECT * FROM highscoretest

      //  SELECT game.name, player.user_name, score.score as best_score,game.id 
      //  FROM score
      //  JOIN game ON score.game_id = game.id
      //  JOIN player ON score.player_id = player.id
      //  WHERE score.score = (SELECT MAX(score) FROM score s WHERE s.game_id = score.game_id)
      //  ORDER BY game.id ASC;

    // Renvoie les meilleurs scores d'un joueur
    static async recap(player_id) {
        const { rows } = await client.query(`SELECT MAX(score) as score, game.name, player.id FROM score JOIN game ON score.game_id = game.id JOIN player ON score.player_id = player.id WHERE player.id = $1 GROUP BY player.id, game.name;`, [player_id]);
        return rows.map(rawData => new this(rawData));

        // SELECT score, name, game_id, game_image_url, player_id FROM "score" WHERE player_id = $1 ORDER BY score DESC
    
    }

    // Renvoie les meilleurs scores d'un jeu en fonction de son id
    static async findByGameId(id) {
        const { rows } = await client.query(`SELECT * FROM "score" JOIN player ON player.id = score.player_id JOIN game ON game.id = score.game_id WHERE game_id = $1 ORDER BY score DESC LIMIT 10`, [id]);
        return rows.map(rawData => new this(rawData));
    
    }

    // Renvoie les meilleurs scores d'un joueur en fonction de son id
    static async findByPlayerId(id) {
        const { rows } = await client.query(`SELECT * FROM "score" WHERE player_id = $1 ORDER BY score DESC LIMIT 20`, [id]);
        return rows.map(rawData => new this(rawData));
    
    }

    // Renvoie le meilleurs scores d'un joueur en fonction de son id
    static async findByPlayerIdAndGameId(player_id, game_id) {
        const result = await client.query(`SELECT * FROM "score" WHERE player_id = $1 AND game_id = $2`, [player_id, game_id]);
    
        // SI je n'ai pas de donnée je retourne null
        if(result.rows.length === 0) {
          return null;
        }

        // Je récupère le premier élément du tableau de résultat car je ne suis censé avoir qu'un seul score par joueur par jeu
        return new Scores(result.rows[0]);
    }
    



    //CRUD

     // insert
    async insert() {
      // Dans une méthode classique (non static), le this fait référence à l'instance de mon objet courant
      // Je créer ma donnée dans la BDD
      // Le returning me permet de récupérer directement les données insérées
      const result = await client.query(`
        INSERT INTO "score" ("score", "player_id", "game_id")
        VALUES ($1, $2, $3)
        RETURNING "score"
      `, [this.score, this.player_id, this.game_id]);

      // Je créer une seule donnée,je récupère donc que le premier élément
      const rawPlayer = result.rows[0];
      
      // Je met à jour les données de mon objet avec l'identifiant généré par la BDD
      this.id = rawPlayer.id;
    }


      // update
    async update() {
      const result = await client.query(`
        UPDATE "score" 
        SET 
          score = $1,  
          updated_at = NOW()
        WHERE
          player_id = $2 AND game_id = $3;
      `, [this.score, this.player.id, this.game.id]);

      // rowCount contient le nombre de ligne modifier par ma requête
      if(result.rowCount === 0) {
        throw new Error('Update player operation did not target any row');
      }
    }

}

module.exports = Scores;
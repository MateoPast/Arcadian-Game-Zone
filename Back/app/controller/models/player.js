const client = require('../../dbClient');
const CoreModel = require("./coreModel");

class Player extends CoreModel {
  user_name;
  mail;
  password;
  avatar_url;

  static tableName = 'player';

  constructor(obj) {
    super(obj);
    this.user_name = obj.user_name;
    this.mail = obj.mail;
    this.password = obj.password;
    this.avatar_url = obj.avatar_url;
  }

  static async findByEmail(mail) {
    // Dans une méthode static le this fait référence à la class en elle même
    // this === Player
    const result = await client.query(`SELECT * FROM "player" WHERE LOWER(mail) = $1`, [mail.toLowerCase()]);
    // Je récupère le premier élément du tableau de résultat car recherchant sur un id, je suis censé n'avoir qu'un seul résultat
    const rawPlayer = result.rows[0];

    // SI je n'ai pas de donnée je retourne null
    if(!rawPlayer) {
      return null;
    }

    return new Player(rawPlayer);
  };

  static async findByUsername(user_name) {
    // Dans une méthode static le this fait référence à la class en elle même
    // this === Player

    // On compare les pseudo en lowercase pour ne pas avoir de soucie
    const result = await client.query(`SELECT * FROM "player" WHERE LOWER(user_name) = $1`, [user_name.toLowerCase()]);
    // Je récupère le premier élément du tableau de résultat car recherchant sur un id, je suis censé n'avoir qu'un seul résultat
    const rawPlayer = result.rows[0];

    // SI je n'ai pas de donnée je retourne null
    if(!rawPlayer) {
      return null;
    }

    return new Player(rawPlayer);
  }

  // insert
  async insert() {
    // Dans une méthode classique (non static), le this fait référence à l'instance de mon objet courant
    // Je créer ma donnée dans la BDD
    // Le returning me permet de récupérer directement les données insérées
    const result = await client.query(`
      INSERT INTO "player" ("user_name", "mail", "password", "avatar_url")
      VALUES ($1, $2, $3, COALESCE($4, '/images/avatars/snake.png'))
      RETURNING "id"
    `, [this.user_name, this.mail, this.password, this.avatar_url]);

    // Je créer une seule donnée,je récupère donc que le premier élément
    const rawPlayer = result.rows[0];
    
    // Je met à jour les données de mon objet avec l'identifiant généré par la BDD
    this.id = rawPlayer.id;
  }
  // update
  async update() {
    const result = await client.query(`
      UPDATE "player" 
      SET 
        user_name = $1, 
        mail = $2, 
        password = $3, 
        avatar_url = $4, 
        updated_at = NOW() 
      WHERE id = $5
    `, [this.user_name, this.mail, this.password, this.avatar_url, this.id]);

    // rowCount contient le nombre de ligne modifier par ma requête
    if(result.rowCount === 0) {
      throw new Error('Update player operation did not target any row');
    }
  }
  // delete
  async delete() {
    const { rowCount } = await client.query(`
      DELETE FROM "player" 
      WHERE id = $1
    `, [this.id]);

    if(rowCount === 0) {
      throw new Error('Delete player operation did not target any row');
    }
  }
}

module.exports = Player;

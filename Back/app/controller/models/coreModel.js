const client = require('../../dbClient');

class CoreModel {
    #id;

    // Sera propre à chaque classe enfant
    static tableName;

    constructor(obj) {
        if(typeof obj?.id === 'number' && obj.id >= 0) {
            this.#id = obj.id
            // on "lève" une erreur => ça arrête tout !
        }
    }

    set id(value) {
      return this.#id = value
    }

    get id() {
        return this.#id;
    }

    static async findAll() {
      // Je suis dans une méthode static, le this représente donc la class courante (dans notre exemple c'est la class User)
      // this.tableName va contenir la valeur de la propriété tableName situer dans notre class User
      const { rows } = await client.query(`SELECT * FROM "${this.tableName}"`);
      // `new this()` permet d'instancier un objet de la class courante du fait que l'on soit dans une méthode static
      // this === User, this est une variable qui va contenir la class
      return rows.map(rawData => new this(rawData));
    }
  
    static async findById(id) {
      // Pour plus d'info voir la méthode findAll
      const result = await client.query(`SELECT * FROM "${this.tableName}" WHERE id = $1`, [id]);
      
      const rawData = result.rows[0];
  
      if(!rawData) {
        return null;
      }
  
      return new this(rawData);
    }
}

module.exports = CoreModel;
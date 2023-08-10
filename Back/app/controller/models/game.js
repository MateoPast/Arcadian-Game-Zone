const CoreModel = require("./coreModel");

class Game extends CoreModel {
    name;
    description;
    game_url;
    image_url;
    static tableName = 'game';

    constructor(obj) {
        super(obj);

        this.name = obj.name;
        this.description = obj.description;
        this.game_url = obj.game_url;
        this.image_url = obj.image_url;
    }
}

module.exports = Game;

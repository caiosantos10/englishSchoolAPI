const database = require('../models');

class GenericService {
    constructor(context) {
        this.context = context;
    }

    findActives() {
        return database[this.context].findAll();
    }

    findById(id) {
        return database[this.context].findOne({ where: { id: Number(id) } });
    }

    create(obj) {
        return database[this.context].create(obj);
    }

    update(id, newObj) {
        return database[this.context].update(newObj, { where: { id: Number(id) } });
    }

    delete(id) {
        return database[this.context].destroy({ where: { id: Number(id) } });
    }

    restore(id) {
        return database[this.context].restore({ where: { id: Number(id) } });
    }
}

module.exports = GenericService;
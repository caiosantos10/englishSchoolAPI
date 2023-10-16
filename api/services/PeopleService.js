const GenericService = require("./GenericService");
const database = require('../models');
const Sequelize = require('sequelize');

class PeopleService extends GenericService {
    constructor() {
        super('People');
        this.registrations = new GenericService('Registrations');
    }

    findAllPeople() {
        return database.People.scope('all').findAll();
    }

    deactivate(id) {
        database.sequelize.transaction(async (transaction) => {
            await database.People.scope('all').update({ active: false }, { where: { id: Number(id) } }, { transaction });
            await database.Registrations.update({ status: 'cancelado' }, { where: { student_id: Number(id) } }, { transaction });
        });
    }

    async getRegistrationsByPerson(id) {
        const people = await database[this.context].findOne({ where: { id: Number(id) } });;
        return people.getEnrolledClasses();
    }

    getMaximumCapacityRegistrations() {
        const MAXIMUM_CAPACITY = 2;
        return database.Registrations
            .findAndCountAll({
                where: { status: 'confirmado' },
                group: ['class_id'],
                attributes: ['class_id'],
                having: Sequelize.literal(`count(class_id) >= ${MAXIMUM_CAPACITY}`)

            });
    }

    createRegistration(id, newRegistration) {
        return database.Registrations.create({ ...newRegistration, student_id: Number(id) });
    }
}

module.exports = PeopleService
const database = require('../models');

class PeopleController {
    static async getAllPeople(req, res) {
        try {
            const people = await database.People.findAll();
            return res.status(200).json(people);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async getPersonById(req, res) {
        try {
            const { id } = req.params;
            const person = await database.People.findOne({ where: { id: Number(id) } });
            return res.status(200).json(person);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async personRegister(req, res) {
        try {
            const person = req.body;
            const newPerson = await database.People.create(person);
            return res.status(200).json(newPerson);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async updatePerson(req, res) {
        try {
            const { id } = req.params
            const person = req.body;
            await database.People.update(person, {
                where: {
                    id: Number(id)
                }
            });
            return res.status(200).send({ message: "Pessoa atualizada com sucesso" });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async deletePerson(req, res) {
        try {
            const { id } = req.params
            await database.People.destroy({ where: { id: Number(id) }});
            return res.status(200).send({ message: "Pessoa removida com sucesso" });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = PeopleController;
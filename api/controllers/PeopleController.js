const database = require('../models');
const { PeopleService } = require('../services');

const service = new PeopleService();

class PeopleController {
    static async getActivePeople(req, res) {
        try {
            const people = await service.findActives();
            return res.status(200).json(people);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async getAllPeople(req, res) {
        try {
            const people = await service.findAllPeople();
            return res.status(200).json(people);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async getPersonById(req, res) {
        try {
            const { id } = req.params;
            const person = await service.findById(id);
            return res.status(200).json(person);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async personRegister(req, res) {
        try {
            const person = req.body;
            const newPerson = await service.create(person);
            return res.status(200).json(newPerson);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async updatePerson(req, res) {
        try {
            const { id } = req.params
            const person = req.body;
            await service.update(id, person);
            return res.status(200).send({ message: "Pessoa atualizada com sucesso" });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async deletePerson(req, res) {
        try {
            const { id } = req.params
            await service.destroy(id);
            return res.status(200).send({ message: "Pessoa removida com sucesso" });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async restorePerson(req, res) {
        try {
            const { id } = req.params
            await service.restore(id);
            res.status(200).json({ message: 'Pessoa restaurada com sucesso' });
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
    static async deactivatePeople(req, res) {
        // O cliente gostaria que, uma vez que o cadastro de um estudante fosse desativado, 
        // todas as matrículas relativas a este estudante automaticamente passassem a constar como “canceladas”.
        try {
            const { id } = req.params;
            await service.deactivate(id)
            res.status(200).json({ message: 'Pessoa desativada com sucesso' });
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    // Registration methods
    static async getAllRegistrationsByPerson(req, res) {
        try {
            const { id } = req.params;
            const registrations = await service.getRegistrationsByPerson(id);
            res.status(200).json(registrations);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
    static async getMaximumCapacityRegistrations(req, res) {
        try {
            const registrations = await service.getMaximumCapacityRegistrations()
            res.status(200).json(registrations.count);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
    static async getRegistrationById(req, res) {
        try {
            const { id } = req.params;
            const registration = await service.registrations.findById(id);
            res.status(200).json(registration);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
    static async createRegistration(req, res) {
        try {
            const { id } = req.params;
            const registration = req.body;;
            const newRegistration = await service.createRegistration(id, registration)
            res.status(200).json(newRegistration);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
    static async updateRegistration(req, res) {
        try {
            const { id } = req.params;
            const newRegistration = req.body
            await service.registrations.update(id, newRegistration);
            const registration = await service.registrations.findById(id);

            res.status(200).json({ message: 'Matrícula atualizada com sucesso', registration });
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
    static async deleteRegistration(req, res) {
        try {
            const { id } = req.params;
            await service.registrations.destroy(id);
            res.status(200).json({ message: 'Matrícula removida com sucesso' });
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
    static async restoreRegistration(req, res) {
        try {
            const { id } = req.params
            await service.registrations.restore(id);
            res.status(200).json({ message: 'Matrícula restaurada com sucesso' });
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
}

module.exports = PeopleController;
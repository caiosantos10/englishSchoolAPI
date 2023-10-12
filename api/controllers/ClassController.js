const db = require("../models");

class ClassController {
    static async getAllClasses(req, res) {
        try {
            const classes = await db.Classes.findAll();
            res.status(200).json(classes);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
    static async getClassById(req, res) {
        try {
            const { id } = req.params;
            const obj = await db.Classes.findOne({ where: { id: Number(id) } });
            res.status(200).json(obj);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
    static async registerClass(req, res) {
        try {
            const newClass = req.body
            const obj = await db.Classes.create(newClass);
            res.status(200).json(obj);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
    static async updateClass(req, res) {
        try {
            const { id } = req.params;
            const newClass = req.body
            await db.Classes.update(newClass, { where: { id: Number(id) } });
            res.status(200).json({ message: 'Turma atualizada com sucesso' });
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
    static async deleteClass(req, res) {
        try {
            const { id } = req.params;
            await db.Classes.destroy({ where: { id: Number(id) } });
            res.status(200).json({ message: 'Turma excluída com sucesso' });
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
    static async restoreClass(req, res) {
        try {
            const { id } = req.params;
            await db.Classes.restore({ where: { id: Number(id) } });
            res.status(200).json({ message: 'Turma restaurada com sucesso' });
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
}

module.exports = ClassController;
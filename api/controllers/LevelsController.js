const db = require("../models");

class LevelsController {
    static async getAllLevels(req, res) {
        try {
            const levels = await db.Levels.findAll();
            res.status(200).json(levels);
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
    static async getLevelById(req, res) {
        try {
            const { id } = req.params
            const level = await db.Levels.findOne({ where: { id: Number(id) } });
            res.status(200).json(level);
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
    static async registerLevel(req, res) {
        try {
            const level = req.body;
            const obj = await db.Levels.create(level);
            res.status(200).json(obj);
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
    static async updateLevel(req, res) {
        try {
            const { id } = req.params
            const level = req.body;
            await db.Levels.update(level, { where: { id: Number(id) } });
            res.status(200).json({ message: 'Nível atualizado com sucesso' });
        } catch (error) {
            res.status(500).json(error.message)
            console.error(error)
        }
    }
    static async deleteLevel(req, res) {
        try {
            const { id } = req.params

            await db.Levels.destroy({ where: { id: Number(id) } });
            res.status(200).json({ message: 'Nível excluído com sucesso' });
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
    static async restoreLevel(req, res) {
        try {
            const { id } = req.params

            await db.Levels.restore({ where: { id: Number(id) } });
            res.status(200).json({ message: 'Nível restaurado com sucesso' });
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
}

module.exports = LevelsController;
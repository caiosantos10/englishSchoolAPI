module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Levels', [
			{
				level_desc: 'básico',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				level_desc: 'intermediário',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				level_desc: 'avançado',
				createdAt: new Date(),
				updatedAt: new Date()
			}
		], {})
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Levels', null, {})
	}
}

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class People extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      People.hasMany(models.Classes, { foreignKey: 'teacher_id' });
      People.hasMany(models.Registrations, { 
        foreignKey: 'student_id', 
        scope: { status: 'confirmado' }, 
        as: 'enrolledClasses' 
      });
    }
  }
  People.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        validator: (name) => {
          if (name.length <= 3) throw new Error("Nome deve conter mais que 3 caracteres");
        }
      }
    },
    active: DataTypes.BOOLEAN,
    email: {
      type: DataTypes.STRING, validate: {
        isEmail: {
          args: true,
          msg: "O email é inválido"
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'People',
    paranoid: true,
    defaultScope: { where: { active: 1 } },
    scopes: {
      all: { where: '' }
    }
  });
  return People;
};
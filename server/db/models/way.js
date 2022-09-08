const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Way extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Location, User }) {
      // define association here
      this.hasMany(Location, { foreignKey: 'wayId' });
      this.belongsTo(User, { foreignKey: 'userId' });
    }
  }
  Way.init({
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Way',
  });
  return Way;
};

const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({
      User, Way, LocationTag, Post,
    }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'userId' });
      this.belongsTo(Way, { foreignKey: 'wayId' });
      this.hasMany(LocationTag, { foreignKey: 'locationId' });
      this.hasMany(Post, { foreignKey: 'locationId' });
    }
  }
  Location.init({
    name: DataTypes.STRING,
    coordX: DataTypes.STRING,
    coordY: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    wayId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Location',
  });
  return Location;
};

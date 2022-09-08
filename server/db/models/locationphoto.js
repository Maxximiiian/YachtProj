const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class LocationPhoto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Location }) {
      // define association here
      this.belongsTo(Location, { foreignKey: 'locationId' });
    }
  }
  LocationPhoto.init({
    image: DataTypes.STRING,
    locationId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'LocationPhoto',
  });
  return LocationPhoto;
};

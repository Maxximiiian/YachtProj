const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class LocationTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Tag, Location }) {
      // define association here
      this.belongsTo(Tag, { foreignKey: 'tagId' });
      this.belongsTo(Location, { foreignKey: 'locationId' });
    }
  }
  LocationTag.init({
    tagId: DataTypes.INTEGER,
    locationId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'LocationTag',
  });
  return LocationTag;
};

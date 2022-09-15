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
    static associate({ Post }) {
      // define association here
      this.belongsTo(Post, { foreignKey: 'postId' });
    }
  }
  LocationPhoto.init({
    image: DataTypes.STRING,
    postId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'LocationPhoto',
  });
  return LocationPhoto;
};

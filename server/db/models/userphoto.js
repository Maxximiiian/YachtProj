const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserPhoto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'userId' });
    }
  }
  UserPhoto.init({
    image: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'UserPhoto',
  });
  return UserPhoto;
};

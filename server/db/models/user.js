const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({
      Like, Location, Way, Post, UserPhoto,
    }) {
      // define association here
      this.hasMany(Like, { foreignKey: 'userId' });
      this.hasMany(Location, { foreignKey: 'userId' });
      this.hasMany(Way, { foreignKey: 'userId' });
      this.hasMany(Post, { foreignKey: 'userId' });
      this.hasMany(UserPhoto, { foreignKey: 'userId' });
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    admin: DataTypes.BOOLEAN,
    theme: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};

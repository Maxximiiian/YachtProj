const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Like, Location, User }) {
      // define association here
      this.hasMany(Like, { foreignKey: 'postId' });
      this.belongsTo(User, { foreignKey: 'userId' });
      this.belongsTo(Location, { foreignKey: 'locationId' });
    }
  }
  Post.init({
    title: DataTypes.STRING,
    body: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    locationId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};

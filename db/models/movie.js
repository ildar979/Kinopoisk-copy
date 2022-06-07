const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      Movie.belongsTo(User, { foreignKey: 'userId' });
    }
  }
  Movie.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
      },
    },
    posterUrlPreview: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    nameRu: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    genre: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    rating: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
  }, {
    sequelize,
    modelName: 'Movie',
    tableName: 'Movies',
    timestamps: false,
  });
  return Movie;
};

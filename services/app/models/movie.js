module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    uniqueName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    voice: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    translator: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    video: DataTypes.STRING,
    poster: DataTypes.STRING,
    isDraft: DataTypes.BOOLEAN,
  });

  Movie.associate = (models) => {
    models.Movie.belongsTo(models.Category, {
      as: 'category',
      foreignKey: {
        allowNull: false,
      },
    });

    models.Movie.hasMany(models.Video, { as: 'videos' });
  };

  return Movie;
};

module.exports = (sequelize, DataTypes) => {
  const Video = sequelize.define('Video', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
  });

  return Video;
};

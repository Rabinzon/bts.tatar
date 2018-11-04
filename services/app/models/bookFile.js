module.exports = (sequelize, DataTypes) => {
  const BookFile = sequelize.define('BookFile', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});

  return BookFile;
};

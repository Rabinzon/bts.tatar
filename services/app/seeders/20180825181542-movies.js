const movies = require('../data/movies');

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Movies', movies, {}),

  down: queryInterface => queryInterface.bulkDelete('Movies', null, {}),
};

const categories = require('../data/categories');

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Categories', categories, {}),

  down: queryInterface => queryInterface.bulkDelete('Categories', null, {}),
};

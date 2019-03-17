const videos = require('../data/videos');

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Videos', videos, {}),

  down: queryInterface => queryInterface.bulkDelete('Videos', null, {}),
};

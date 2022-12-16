'use strict';
import { stories } from '../seeder-data';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Stories', stories, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Stories', null, {});
  },
};

'use strict';
import { viewers } from '../seeder-data';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Viewers', viewers, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Viewers', null, {});
  },
};

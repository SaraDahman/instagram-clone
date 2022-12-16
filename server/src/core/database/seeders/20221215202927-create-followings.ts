'use strict';
import { following } from '../seeder-data';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Followings', following, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Followings', null, {});
  },
};

'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('LocationTags', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tagId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Tags',
          key: 'id',
        },
        onDelete: 'cascade',
        allowNull: false,
      },
      locationId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Locations',
          key: 'id',
        },
        onDelete: 'cascade',
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('LocationTags');
  }
};
module.exports = {
  async up(queryInterface, Sequelize) {
    const waysArr = [
      {
        name: 'Bob', userId: 1, createdAt: new Date(), updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert('Locations', waysArr, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Locations', null, {});
  },
};

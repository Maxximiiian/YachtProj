module.exports = {
  async up(queryInterface, Sequelize) {
    const waysArr = [
      {
        name: 'Krytoi', userId: 1, createdAt: new Date(), updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert('Ways', waysArr, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Ways', null, {});
  },
};

module.exports = {
  async up(queryInterface, Sequelize) {
    const locationArr = [
      {
        name: 'Bob', coordX: '22', coordY: '22', userId: 1, wayId: 1, createdAt: new Date(), updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert('Locations', locationArr, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Locations', null, {});
  },
};

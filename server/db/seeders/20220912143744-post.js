module.exports = {
  async up(queryInterface, Sequelize) {
    const postArr = [
      {
        title: 'Bob', body: 'stupid', locationId: 1, userId: 1, wayId: 1, createdAt: new Date(), updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert('Posts', postArr, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Posts', null, {});
  },
};

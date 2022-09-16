const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const userArr = [
      {
        name: 'Bob', email: 'bob@bob', password: await bcrypt.hash('123', 10), phone: '77777777', admin: true, theme: false, createdAt: new Date(), updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert('Users', userArr, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};

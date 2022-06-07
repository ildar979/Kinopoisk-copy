module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Вася Пупкин',
        email: 'vasya_pupok@kucheryaviy.ru',
        password: '1234',
        createdAt: new Date(),
        updatedAt: new Date(),
      }]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users');
  },
};

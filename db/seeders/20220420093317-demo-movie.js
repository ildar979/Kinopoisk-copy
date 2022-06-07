module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Movies', [
      {
        userId: 1,
        posterUrlPreview: '/img/LOTR.jpg',
        nameRu: 'Владстелин колец',
        genre: 'Фэнтези',
        rating: '9',
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Movies');
  },
};

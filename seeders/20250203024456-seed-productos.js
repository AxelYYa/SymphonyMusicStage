'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Productos', [
      // 🎸 Instrumentos de Cuerda
      { nombre: 'Guitarra Acústica Yamaha F310', descripcion: 'Guitarra acústica de 6 cuerdas', stock: 10, stock_minimo: 2, precio: 3500, categoriaId: 1, imagepath: '1.jpeg', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Bajo Eléctrico Fender Jazz Bass', descripcion: 'Bajo eléctrico de 4 cuerdas', stock: 8, stock_minimo: 2, precio: 12000, categoriaId: 1, imagepath: '2.jpeg', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Violín Stradivarius Réplica', descripcion: 'Violín hecho a mano con arco', stock: 5, stock_minimo: 1, precio: 25000, categoriaId: 1, imagepath: '3.jpeg', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Ukulele Mahalo Soprano', descripcion: 'Ukulele soprano de 4 cuerdas', stock: 15, stock_minimo: 3, precio: 1500, categoriaId: 1, imagepath: '4.jpeg', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Tololoche de Madera Clásico', descripcion: 'Tololoche hecho a mano', stock: 5, stock_minimo: 1, precio: 15000, categoriaId: 1, imagepath: '5.jpeg', createdAt: new Date(), updatedAt: new Date() },

      // 🎷 Instrumentos de Viento
      { nombre: 'Trompeta Yamaha YTR-2330', descripcion: 'Trompeta en si bemol', stock: 7, stock_minimo: 2, precio: 8000, categoriaId: 2, imagepath: '6.jpeg', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Acordeón Hohner Panther', descripcion: 'Acordeón de 31 botones', stock: 4, stock_minimo: 1, precio: 9000, categoriaId: 2, imagepath: '7.jpeg', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Flauta Traversa Yamaha', descripcion: 'Flauta traversa plateada', stock: 10, stock_minimo: 2, precio: 6000, categoriaId: 2, imagepath: '8.jpeg', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Clarinete Buffet Crampon', descripcion: 'Clarinete de madera profesional', stock: 5, stock_minimo: 1, precio: 18000, categoriaId: 2, imagepath: '9.jpeg', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Saxofón Alto Yamaha YAS-280', descripcion: 'Saxofón alto dorado', stock: 3, stock_minimo: 1, precio: 25000, categoriaId: 2, imagepath: '10.jpeg', createdAt: new Date(), updatedAt: new Date() },

      // 🥁 Percusiones
      { nombre: 'Batería Pearl Roadshow', descripcion: 'Batería completa de 5 piezas', stock: 6, stock_minimo: 2, precio: 18000, categoriaId: 3, imagepath: '11.jpeg', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Conga LP Matador', descripcion: 'Conga de madera 11 3/4 pulgadas', stock: 4, stock_minimo: 1, precio: 5000, categoriaId: 3, imagepath: '12.jpeg', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Cajón Flamenco Schlagwerk', descripcion: 'Cajón de madera profesional', stock: 8, stock_minimo: 2, precio: 3500, categoriaId: 3, imagepath: '13.jpeg', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Pandereta Remo Fiberskyn', descripcion: 'Pandereta de 10 pulgadas con jingles', stock: 20, stock_minimo: 5, precio: 600, categoriaId: 3, imagepath: '14.jpeg', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Timbal Tito Puente LP', descripcion: 'Juego de timbales de acero', stock: 3, stock_minimo: 1, precio: 12000, categoriaId: 3, imagepath: '15.jpeg', createdAt: new Date(), updatedAt: new Date() },

      // 🎼 Accesorios
      { nombre: 'Cuerdas para Guitarra Elixir 80/20', descripcion: 'Juego de cuerdas para guitarra acústica', stock: 20, stock_minimo: 5, precio: 500, categoriaId: 4, imagepath: '16.jpeg', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Capotrasto Dunlop Trigger', descripcion: 'Capo para guitarra', stock: 15, stock_minimo: 3, precio: 450, categoriaId: 4, imagepath: '17.jpeg', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Afinador Digital Korg', descripcion: 'Afinador cromático para instrumentos', stock: 25, stock_minimo: 5, precio: 300, categoriaId: 4, imagepath: '18.jpeg', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Púas Fender Medium', descripcion: 'Paquete de 12 púas medianas', stock: 50, stock_minimo: 10, precio: 120, categoriaId: 4, imagepath: '19.jpeg', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Soporte de Guitarra Hercules', descripcion: 'Soporte ajustable para guitarra o bajo', stock: 10, stock_minimo: 2, precio: 800, categoriaId: 4, imagepath: '20.jpeg', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Productos', null, {});
  }
};
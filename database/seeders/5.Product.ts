import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Product from 'App/Models/Product';

export default class extends BaseSeeder {
  public async run () {
    await Product.createMany([
  {
    name: 'Produto 1',
    author: 'Autor 1',
    editor: 'Editora 1',
    price: 10.99,
  },
  {
    name: 'Produto 2',
    author: 'Autor 2',
    editor: 'Editora 2',
    price: 12.99,
  },
  {
    name: 'Produto 3',
    author: 'Autor 3',
    editor: 'Editora 3',
    price:  9.99,
  },
]);

  }
}

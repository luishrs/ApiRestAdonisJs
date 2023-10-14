import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Sale from 'App/Models/Sale';

export default class extends BaseSeeder {
  public async run () {
 await Sale.createMany([
  {
    client_id: 1, 
    product_id: 1, 
    quantity: 2,
    unitPrice: 10.99,
  },
  {
    client_id: 2, 
    product_id: 2, 
    quantity: 3,
    unitPrice: 12.99,
  },
  {
    client_id: 3, 
    product_id: 3,
    quantity: 1,
    unitPrice: 9.99,
  },
]);

  }
}

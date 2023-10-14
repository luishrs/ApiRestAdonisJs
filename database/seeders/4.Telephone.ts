import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Telephone from 'App/Models/Telephone'

export default class extends BaseSeeder {
  public async run () {
    await Telephone.createMany([
      {
        client_id: 1,
        number: '123456789',
      },
      {
        client_id: 2,
        number: '234567890',
      },
      {
        client_id: 3,
        number: '345678901',
      },
    ])
  }
}

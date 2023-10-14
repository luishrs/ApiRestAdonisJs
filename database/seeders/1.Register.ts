import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User';

export default class extends BaseSeeder {
  public async run () {
    await User.createMany([
  {
    email: 'usuario1@example.com',
    password: 'senha1',
  },
  {
    email: 'usuario2@example.com',
    password: 'senha2',
  },
  {
    email: 'usuario3@example.com',
    password: 'senha3',
  },
]);

  }
}

import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Address from 'App/Models/Address'

export default class extends BaseSeeder {
  public async run () {
    await Address.createMany([
      {
        client_id: 1,
        country: 'País 1',
        state: 'Estado 1',
        city: 'Cidade 1',
        neighborhood: "Bairro 1",
        street: 'Rua 1',
        number: "1",       
      },
      {
        client_id: 2,
        country: 'País 2',
        state: 'Estado 2',
        city: 'Cidade 2',
        neighborhood: "Bairro 2",
        street: 'Rua 2',
        number: "2",       
      },
      {
        client_id: 3,
        country: 'País 3',
        state: 'Estado 3',
        city: 'Cidade 3',
        neighborhood: "Bairro 3",
        street: 'Rua 3',
        number: "3",       
      },
    ])
  }
}

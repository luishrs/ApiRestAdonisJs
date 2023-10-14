import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Client from 'App/Models/Client'

export default class extends BaseSeeder {
  public async run () {
   await Client.createMany([ {
    user_id: 1, // Deve corresponder a um ID de usuário existente
    name: 'Cliente 1',
    cpf: '12345678901',
  },
  {
    user_id: 2, // Deve corresponder a um ID de usuário existente
    name: 'Cliente 2',
    cpf: '23456789012',
  },
  {
    user_id: 3, // Deve corresponder a um ID de usuário existente
    name: 'Cliente 3',
    cpf: '34567890123',
  },
  ])
  }
}

import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Client from 'App/Models/Client'

export default class extends BaseSeeder {
  public async run () {
   await Client.createMany([ {
    name: 'Cliente 1',
    cpf: '12345678901',
  },
  {    
    name: 'Cliente 2',
    cpf: '23456789012',
  },
  {    
    name: 'Cliente 3',
    cpf: '34567890123',
  },
  ])
  }
}

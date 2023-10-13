import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'addresses'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')      
      table.string('country')
      table.string('state')
      table.string('city')
      table.string('neighborhood')
      table.string('street')
      table.string('number')   
      
      table.integer('client_id').unsigned().references('id').inTable('clients').onDelete('CASCADE')
      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

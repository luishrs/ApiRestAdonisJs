import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Sale from './Sale'
import Telephone from './Telephone'
import Address from './Address'


export default class Client extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number
  
  @column()
  public name: string

  @column()
  public cpf: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(()=>Sale, {
    foreignKey: 'client_id',
  })
  public sales: HasMany<typeof Sale>

  @hasMany(()=>Telephone, {
    foreignKey: 'client_id',
  })
  public telephones: HasMany<typeof Telephone>

  @hasMany(()=>Address, {
    foreignKey: 'client_id',
  })
  public addresses: HasMany<typeof Address>
   

}

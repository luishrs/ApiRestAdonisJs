import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Client from './Client'
import Product from './Product'

export default class Sale extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public client_id: number

  @column()
  public product_id: number

  @column()
  public quantity: number

  @column()
  public totalPrice: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(()=>Client, {
    foreignKey: 'client_id',
  })
  public client: BelongsTo<typeof Client>

  @belongsTo(()=>Product, {
    foreignKey: 'product_id',
  })
  public sale: BelongsTo<typeof Product>
}

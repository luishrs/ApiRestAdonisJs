import { DateTime } from 'luxon'
import { BaseModel, column, beforeSave, hasOne, belongsTo, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import Client from './Client'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column( )
  public email: string

  @column()
  public password: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(()=>Client, {
    foreignKey: 'user_id',
  })
  public client: HasOne<typeof Client>

   @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}

import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class UserAccess extends BaseModel {

  static table = "user_accesses";

  @column({ isPrimary: true })
  public id: number

  @column()
  userId: number
  systemModuleId: number
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

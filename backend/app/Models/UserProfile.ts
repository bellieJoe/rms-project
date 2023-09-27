import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class UserProfile extends BaseModel {

  static table = "user_profiles";

  @column({ isPrimary: true })
  public id: number

  @column()
  userId: number
  name: string
  contactNumber: string
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

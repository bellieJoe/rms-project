import { DateTime } from 'luxon'
import { BaseModel, HasOne, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import UserProfile from './UserProfile';

export default class User extends BaseModel {
  public static table = "users";
  
  @column({ isPrimary: true })
  public id: number

  @column()
  public password: string

  @column()
  public email: string

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  // relationships
  @hasOne(()=>UserProfile)
  public userProfile: HasOne<typeof UserProfile>
}

import { DateTime } from 'luxon'
import { BaseModel, HasOne, column, hasMany, hasOne } from '@ioc:Adonis/Lucid/Orm'
import UserProfile from './UserProfile';
import Employee from './Employee';

export default class User extends BaseModel {
  public static table = "users";

  @column({ isPrimary: true })
  public id: number

  @column()
  public password: string

  @column()
  public email: string

  @column()
  public emailVerifiedAt: any

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  // relationships
  @hasOne(()=>UserProfile)
  public userProfile: HasOne<typeof UserProfile>

  @hasOne(()=>Employee)
  public employee : HasOne<typeof Employee>
}

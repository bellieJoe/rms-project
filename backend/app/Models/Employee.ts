import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import ServiceRecord from './ServiceRecord'
import User from './User'

export default class Employee extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  userId: number

  @column()
  isActive : boolean

  @column()
  privilegeLevel : number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(()=>ServiceRecord)
  public serviceRecords : HasMany<typeof ServiceRecord>

  @belongsTo(()=>User)
  public user : BelongsTo<typeof User>
}

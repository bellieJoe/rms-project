import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Dtr extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  date: any

  @column()
  in: any

  @column()
  out: any

  @column()
  employeeId:number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

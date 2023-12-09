import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ServiceRecord extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  employeeId:number

  @column()
  position : string

  @column()
  from : string

  @column()
  to : string

  @column()
  perDaySalary : number

  @column()
  isActive : boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

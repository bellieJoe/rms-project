import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Employee from './Employee'

export default class Payroll extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  from : any
  @column()
  to:any
  @column()
  employeeId:number
  @column()
  netPay : number
  @column()
  daysWorked:number
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(()=>Employee)
  employee : BelongsTo<typeof Employee>
}

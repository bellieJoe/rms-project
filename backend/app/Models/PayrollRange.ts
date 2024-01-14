import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class PayrollRange extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  from:any
  @column()
  to:any
  @column()
  isDeleted:boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

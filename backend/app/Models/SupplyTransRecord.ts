import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class SupplyTransRecord extends BaseModel {
  static table = "supply_trans_records";

  @column({ isPrimary: true })
  public id: number

  @column.dateTime()
  date: DateTime

  @column()
  transType: string
  amount: number
  careOf: number
  supplyStockId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

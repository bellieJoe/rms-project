import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class SupplyStock extends BaseModel {
  static table = "supply_stocks";

  @column({ isPrimary: true })
  public id: number

  @column()
  supplyItemVariantId: number
  batchNo: string
  stockAmount: number
  
  @column.dateTime()
  expirationDate: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

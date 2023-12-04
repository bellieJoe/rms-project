
import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import SupplyTransRecord from './SupplyTransRecord';

export default class SupplyStock extends BaseModel {
  static table = "supply_stocks";

  @column({ isPrimary: true })
  public id: number

  @column()
  supplyItemId: number
  @column()
  batchNo: string
  @column()
  stockAmount: number
  
  @column.dateTime()
  expirationDate: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(()=>SupplyTransRecord)
  public supplyTransRecords : HasMany<typeof SupplyTransRecord>

  public remaining? : number
}

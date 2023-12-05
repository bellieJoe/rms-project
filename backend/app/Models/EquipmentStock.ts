import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class EquipmentStock extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  eqStockNo : string

  @column()
  equipmentStatus: string

  @column()
  batchNo : string

  @column()
  dateAdded : Date
  
  @column()
  equipmentItemId : number


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

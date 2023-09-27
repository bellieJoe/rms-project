import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class SupplyUnit extends BaseModel {

  static table = "supply_units";

  @column({ isPrimary: true })
  public id: number

  @column()
  unitName: string
  description: string
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

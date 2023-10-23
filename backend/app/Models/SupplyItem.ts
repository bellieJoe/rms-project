import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class SupplyItem extends BaseModel {
  static table = "supply_items";

  @column({ isPrimary: true })
  public id: number

  @column()
  supplyCategoryId: number
  @column()
  supplyName: string
  @column()
  description: string
  @column()
  isArchived: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

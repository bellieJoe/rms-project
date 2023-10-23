import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class SupplyItemVariant extends BaseModel {
  static table = "supply_item_variants";

  @column({ isPrimary: true })
  public id: number

  @column()
  supplyItemId: number
  @column()
  supplyUnitId: number
  @column()
  criticalLevel: number
  @column()
  variantName: string
  @column()
  onlyVariant: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

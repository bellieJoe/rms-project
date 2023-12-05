import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class EquipmentItem extends BaseModel {
  public static table = "equipment_items";

  @column({ isPrimary: true })
  public id: number

  @column()
  name: string
  @column()
  specifications: string
  @column()
  description: string
  // @column()
  // equipmentNo: string
  // @column()
  // equipmentStatusId: number
  // @column()
  // equipmentCategoryId: number

  // @column()
  // bacthNo: string

  @column.dateTime()
  dateAdded: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

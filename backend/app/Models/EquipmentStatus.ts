import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class EquipmentStatus extends BaseModel {
  public static table = "equipment_statuses";

  @column({ isPrimary: true })
  public id: number

  @column()
  name: string
  @column()
  color: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

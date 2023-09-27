import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class DeliveryType extends BaseModel {
  public static table = "delivery_types";

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string
  public description: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

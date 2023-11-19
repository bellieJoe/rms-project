import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class OrderStatusHistory extends BaseModel {
  static table = "order_status_histories";

  @column({ isPrimary: true })
  public id: number

  @column()
  orderId: number
  // @column()
  // orderStatusId: number
  @column()
  notes: string
  @column()
  status: string
  @column()
  reason: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

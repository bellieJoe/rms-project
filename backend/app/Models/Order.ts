import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Order extends BaseModel {
  static table = "orders"

  @column({ isPrimary: true })
  public id: number

  @column()
  qrId: string
  notes: string
  modeOfPaymentId: number
  userId: number
  isPos: boolean
  deliveryTypeId: number

  @column.dateTime()
  dateOrdered: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

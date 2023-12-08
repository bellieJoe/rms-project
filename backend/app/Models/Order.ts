import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Order extends BaseModel {
  static table = "orders"

  @column({ isPrimary: true })
  public id: number

  @column()
  qrId: string
  @column()
  notes: string
  @column()
  address: string
  @column()
  modeOfPaymentId: number
  @column()
  userId: number
  @column()
  isPos: boolean
  @column()
  deliveryTypeId: number
  @column()
  status: string
  @column()
  tableNo: number
  @column()
  deliveryCharge: number

  @column.dateTime()
  dateOrdered: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public user : BelongsTo<typeof User>

}

import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class OrderItem extends BaseModel {
  static table = "order_items";

  @column({ isPrimary: true })
  public id: number

  @column()
  productVariantId: number
  @column()
  price: number
  @column()
  quantity: number
  @column()
  menuPackageId: number
  @column()
  orderSnapshot: any
  @column()
  orderId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

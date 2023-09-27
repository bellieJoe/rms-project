import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class OrderItem extends BaseModel {
  static table = "order_items";

  @column({ isPrimary: true })
  public id: number

  @column()
  productVariantId: number
  price: number
  menuPackageId: number
  orderSnapshot: any
  orderId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ProductVariant extends BaseModel {
  static table = "product_variants";

  @column({ isPrimary: true })
  public id: number

  @column()
  productItemId: number
  name: string
  price: number
  description: string
  isArchived: number
  onlineAvailability: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

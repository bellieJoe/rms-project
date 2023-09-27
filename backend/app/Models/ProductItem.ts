import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ProductItem extends BaseModel {
  static table = "product_items";

  @column({ isPrimary: true })
  public id: number

  @column()
  name: string
  description: string
  image: string
  isArchived: boolean
  inMenu: boolean
  productCategoryId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

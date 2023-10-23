
import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ProductItem extends BaseModel {
  static table = "product_items";

  @column({ isPrimary: true })
  public id: number

  @column()
  name: string
  @column()
  description: string
  @column()
  image: string
  @column()
  isArchived: boolean
  @column()
  inMenu: boolean
  @column()
  productCategoryId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

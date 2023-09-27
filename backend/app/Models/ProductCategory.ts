import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ProductCategory extends BaseModel {
  static table = "product_categories";

  @column({ isPrimary: true })
  public id: number

  @column()
  name: string
  description: string
  color: string
  isArchived: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import ProductItem from './ProductItem';

export default class ProductCategory extends BaseModel {
  static table = "product_categories";

  @column({ isPrimary: true })
  public id: number

  @column()
  name: string
  @column()
  description: string
  @column()
  color: string
  @column()
  isArchived: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(()=>ProductItem)
  public productItems : HasMany<typeof ProductItem>
}

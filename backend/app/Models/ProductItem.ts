
import { DateTime } from 'luxon'
import { BaseModel, HasMany, afterFetch, column, computed, hasMany } from '@ioc:Adonis/Lucid/Orm'
import ProductVariant from './ProductVariant';

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


  @hasMany(() => ProductVariant)
  public productVariants: HasMany<typeof ProductVariant>

  @computed()
  public get menuVisibility(){
    const _variants_in_menu =  this.productVariants.filter((variant) => {
      return variant.inMenu == 1
    })
    return _variants_in_menu.length > 0 ? true : false
  }


}

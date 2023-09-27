import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class MenuPackageItem extends BaseModel {
  static table = "menu_package_items";

  @column({ isPrimary: true })
  public id: number

  @column()
  menuPackageId: number
  productId: number
  productVariantId: number
  version: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

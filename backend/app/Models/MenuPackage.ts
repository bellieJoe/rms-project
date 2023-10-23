
import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class MenuPackage extends BaseModel {
  public static table = "equipment_packages";

  @column({ isPrimary: true })
  public id: number

  @column()
  name: string
  @column()
  description: string
  @column()
  price: number
  @column()
  inMenu: boolean
  @column()
  activeVersion: number
  @column()
  productCategoryId: number
  @column()
  onlineAvailability: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

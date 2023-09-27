import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class MenuPackage extends BaseModel {
  public static table = "equipment_packages";

  @column({ isPrimary: true })
  public id: number

  @column()
  name: string
  description: string
  price: number
  inMenu: boolean
  activeVersion: number
  productCategoryId: number
  onlineAvailability: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

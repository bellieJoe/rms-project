import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class SystemModule extends BaseModel {

  static table = "system_modules";

  @column({ isPrimary: true })
  public id: number

  @column()
  moduleName: string
  @column()
  description: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

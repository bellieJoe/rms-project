import { DateTime } from 'luxon'
import { BaseModel, column, computed } from '@ioc:Adonis/Lucid/Orm'

export default class AppSetting extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public deliveryRadiusM: number
  @column()
  public deliveryExcessChargePerMinute: number
  @column()
  public deliveryCharge: number
  @column()
  public normalDeliveryDurationM: number
  @column()
  public storeLocation: any

  @computed()
  public get json_store_location() : string {
    const _json = JSON.parse(this.storeLocation)
    return _json
  }
  

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

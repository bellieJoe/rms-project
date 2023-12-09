import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import AppSetting from 'App/Models/AppSetting'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await AppSetting.create({
      deliveryCharge: 25,
      deliveryRadiusM: 1000,
      deliveryExcessChargePerMinute: 5,
      normalDeliveryDurationM: 5,
      storeLocation: {
        long: 121.8299243,
        lat: 13.4449707
      }
    })
  }
}

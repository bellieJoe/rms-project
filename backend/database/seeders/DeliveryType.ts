import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import DeliveryType from 'App/Models/DeliveryType'

export default class extends BaseSeeder {
  public async run () {
    await DeliveryType.createMany([
      {
        name: 'Dine In',
        description: 'Dine In'
      },
      {
        name: 'Take Out',
        description: 'Take Ou'
      },
      {
        name: 'For Delivery',
        description: 'For Delivery'
      },
    ])
  }
}

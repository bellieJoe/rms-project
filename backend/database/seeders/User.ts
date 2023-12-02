import Hash from '@ioc:Adonis/Core/Hash'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import UserProfile from 'App/Models/UserProfile'

export default class extends BaseSeeder {
  public async run () {
    const user = await User.create({
      email: 'admin@email.com',
      password: await Hash.make('password')
    })
    await user.related('userProfile').create({
      name: "Admin",
      contactNumber: '09493131426'
    })
    await user.related('employee').create({
      isActive: true,
      privilegeLevel: 1,
    })

  }
}

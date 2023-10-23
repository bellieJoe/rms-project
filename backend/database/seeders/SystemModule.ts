import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import SystemModule from 'App/Models/SystemModule'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await SystemModule.createMany([
      {
        moduleName: 'users',
        description: 'User Management'
      },
      {
        moduleName: 'payroll',
        description: 'Payroll Management'
      }
    ]);
  }
}

import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'supply_units'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string("unit_name", 1000).notNullable();
      table.string("description", 5000).notNullable();
      table.timestamps();
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'equipment_statuses'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string("name", 1000).notNullable();
      table.string("color", 1000).notNullable();
      table.timestamps();
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

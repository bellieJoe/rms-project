import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'equipment_items'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string("name", 1000).notNullable();
      table.string("specifications", 20000).notNullable();
      // table.string("equipment_no", 1000).notNullable();
      // table.integer("equipment_status_id").unsigned().notNullable();
      // table.integer("equipment_category_id").unsigned().nullable();
      table.string("description", 5000).nullable();
      // table.string("batch_no", 1000).nullable();
      // table.datetime("date_added").notNullable();
      table.timestamps();
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

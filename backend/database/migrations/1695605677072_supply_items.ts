import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'supply_items'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.integer("supply_category_id").unsigned().notNullable();
      table.string("supply_name", 1000).notNullable();
      table.string("description", 5000).nullable();
      table.string("specifications", 20000).notNullable();
      table.integer("critical_level").notNullable();
      table.boolean("is_archived").notNullable().defaultTo(false);
      table.timestamps();
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

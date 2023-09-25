import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'supply_item_variants'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer("supply_item_id").unsigned().notNullable();
      table.integer("supply_unit_id").unsigned().notNullable();
      table.integer("critical_level").notNullable();
      table.string("variant_name", 1000).notNullable();
      table.boolean("only_variant").defaultTo(true).notNullable();
      table.timestamps();
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

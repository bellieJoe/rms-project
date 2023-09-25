import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'supply_item_variants'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.foreign("supply_item_id").references("id").inTable("supply_items");
      table.foreign("supply_unit_id").references("id").inTable("supply_units");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

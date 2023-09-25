import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'supply_stocks'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.foreign("supply_item_variant_id").references("id").inTable("supply_item_variants");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'supply_stocks'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.foreign("supply_item_id").references("id").inTable("supply_items");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

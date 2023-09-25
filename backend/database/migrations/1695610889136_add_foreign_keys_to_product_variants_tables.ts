import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'product_variants'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.foreign("product_item_id").references("id").inTable("product_items");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

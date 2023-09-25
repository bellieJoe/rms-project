import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'product_items'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.foreign("product_category_id").references("id").inTable("product_categories");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

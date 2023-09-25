import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'order_items'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.foreign("product_variant_id").references("id").inTable("product_variants");
      table.foreign("menu_package_id").references("id").inTable("menu_packages");
      table.foreign("order_id").references("id").inTable("orders");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

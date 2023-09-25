import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'menu_package_items'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.foreign("menu_package_id").references("id").inTable("menu_packages");
      table.foreign("product_id").references("id").inTable("product_items");
      table.foreign("product_variant_id").references("id").inTable("product_variants");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

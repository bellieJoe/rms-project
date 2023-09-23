import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'menu_package_items'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer("menu_package_id").unsigned().notNullable()
      table.integer("product_id").unsigned().notNullable()
      table.integer("product_variant_id").unsigned().notNullable()
      table.integer("version").notNullable()
      table.timestamps()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

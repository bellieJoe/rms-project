import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'menu_packages'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string("name", 1000).notNullable()
      table.string("description", 5000).notNullable()
      table.double("price").notNullable()
      table.boolean("in_menu").notNullable().defaultTo(false)
      table.integer("active_version").notNullable().defaultTo(1);
      table.integer("product_category_id").unsigned().notNullable();
      table.boolean("online_availability").notNullable().defaultTo(false);
      table.timestamps()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

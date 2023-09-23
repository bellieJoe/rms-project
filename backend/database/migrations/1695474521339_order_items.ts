import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'order_items'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('product_variant_id').unsigned().notNullable()
      table.double('price').notNullable()
      table.integer('menu_package_id').unsigned()
      table.json('order_snapshot').notNullable()
      table.integer('order_id').unsigned().notNullable()
      table.timestamps()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'product_items'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 1000).notNullable()
      table.string('description', 5000).notNullable()
      table.string('image', 1000).notNullable()
      table.boolean('is_archived').notNullable().defaultTo(false)
      table.boolean('in_menu').notNullable().defaultTo(false)
      table.integer('product_category_id').unsigned().notNullable()
      table.timestamps()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

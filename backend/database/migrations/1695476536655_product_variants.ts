import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'product_variants'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer("product_item_id").unsigned().notNullable()
      table.string("name", 1000).notNullable()
      table.double("price").notNullable()
      table.string("description").notNullable()
      table.boolean("is_archived").notNullable().defaultTo(false)
      table.boolean("online_availability").notNullable().defaultTo(true)
      table.timestamps()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

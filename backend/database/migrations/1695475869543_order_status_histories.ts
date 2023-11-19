import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'order_status_histories'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('order_id').unsigned().notNullable()
      table.enum('status', ['Pending', 'Canceled', 'Processing', 'In Delivery', 'Completed'])
      table.string('reason', 5000).nullable()
      // table.integer('order_status_id').unsigned().notNullable()
      table.string('notes', 5000).nullable()
      table.timestamps()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

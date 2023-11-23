import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'orders'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('qr_id', 1000).notNullable()
      table.dateTime('date_ordered').notNullable()
      table.string('notes', 5000)
      table.string('address', 10000)
      table.integer('table_no').unsigned().nullable()
      table.integer('mode_of_payment_id').unsigned().nullable()
      table.integer('user_id').unsigned().nullable()
      table.boolean('is_pos').notNullable().defaultTo(false)
      table.enum('status', ['Pending', 'Canceled', 'Processing', 'In Delivery', 'Completed'])
      table.integer('delivery_type_id').unsigned().nullable()
      table.timestamps()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

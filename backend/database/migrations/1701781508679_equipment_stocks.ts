import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'equipment_stocks'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('equipment_item_id').notNullable().unsigned()
      table.string('eq_stock_no', 1000).notNullable().unique()
      table.string('batch_no', 1000).notNullable()
      table.enum('equipment_status', ['LOST', 'IN_USE', 'CONDEMNED', 'STOCK']).notNullable()
      table.date('date_added').notNullable()
      table.timestamps()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

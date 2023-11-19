import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'order_status_histories'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.foreign("order_id").references("id").inTable("orders");
      // table.foreign("order_status_id").references("id").inTable("order_statuses");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

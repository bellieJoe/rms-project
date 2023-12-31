import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'supply_stocks'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer("supply_item_id").unsigned().notNullable();
      table.string("batch_no", 1000).notNullable();
      table.double("stock_amount").notNullable();
      table.datetime("expiration_date").nullable();
      table.timestamps();
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

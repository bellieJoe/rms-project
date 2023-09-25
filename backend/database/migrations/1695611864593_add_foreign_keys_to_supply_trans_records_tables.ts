import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'supply_trans_records'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.foreign("care_of").references("id").inTable("users");
      table.foreign("supply_stock_id").references("id").inTable("supply_stocks");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

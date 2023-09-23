import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'supply_trans_records'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.dateTime("date").notNullable();
      table.enum("trans_type", ["issued", "expired"]).notNullable();
      table.double("amount").notNullable();
      table.integer("care_of").notNullable().unsigned();
      table.integer("supply_stock_id").unsigned().notNullable();
      table.timestamps();
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

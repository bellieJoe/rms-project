import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'orders'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.foreign("mode_of_payment_id").references("id").inTable("mode_of_payments");
      table.foreign("user_id").references("id").inTable("users");
      table.foreign("delivery_type_id").references("id").inTable("delivery_types");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

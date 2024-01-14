import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'payrolls'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.foreign('payroll_range_id').references('id').inTable('payroll_ranges')
      // table.foreign("equipment_item_id").references("id").inTable("equipment_items")
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

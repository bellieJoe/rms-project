import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'payrolls'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      // table.enum('status', ['Pending', 'Canceled', 'Processing','Ready for Delivery', 'In Delivery', 'Completed']).alter()
      table.dropColumn('from')
      table.dropColumn('to')
      table.integer('payroll_range_id').unsigned()
      // table.foreign('payroll_range_id').references('id').inTable('payroll_ranges')
      table.boolean('is_remitted').notNullable().defaultTo(false)
      table.boolean('is_deleted').notNullable().defaultTo(false)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

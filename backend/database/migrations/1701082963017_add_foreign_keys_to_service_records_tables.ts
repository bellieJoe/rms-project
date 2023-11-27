import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'service_records'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.foreign("employee_id").references("id").inTable("employees")
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

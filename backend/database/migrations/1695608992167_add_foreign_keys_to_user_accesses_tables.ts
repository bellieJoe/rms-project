import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'user_accesses'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.foreign("system_module_id").references("id").inTable("system_modules");
      table.foreign("user_id").references("id").inTable("users");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

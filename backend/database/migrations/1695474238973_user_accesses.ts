import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'user_accesses'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().notNullable()
      table.integer('system_module_id').unsigned().notNullable()
      table.timestamps()

      table.foreign('user_id').references('id').inTable('users')
      table.foreign('system_module_id').references('id').inTable('system_modules')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

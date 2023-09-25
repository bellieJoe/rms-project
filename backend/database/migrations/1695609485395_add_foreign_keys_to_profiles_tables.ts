import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'user_profiles'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.foreign("user_id").references("id").inTable("users");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

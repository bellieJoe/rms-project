import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'supply_items'

  public async up () {
    // this.schema.alterTable(this.tableName, (table) => {
    //   table.foreign("supply_category_id").references("id").inTable("supply_categories")
    // })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

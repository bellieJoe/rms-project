import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'equipment_items'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.foreign("equipment_status_id").references("id").inTable("equipment_statuses")
      table.foreign("equipment_category_id").references("id").inTable("equipment_categories");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

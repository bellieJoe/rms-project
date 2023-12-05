import { DateTime } from 'luxon'
import { BaseModel, column, computed } from '@ioc:Adonis/Lucid/Orm'
import SupplyStock from './SupplyStock';

export default class SupplyItem extends BaseModel {
  static table = "supply_items";

  @column({ isPrimary: true })
  public id: number

  // @column()
  // supplyCategoryId: number
  @column()
  critical_level: number
  @column()
  specifications: number
  @column()
  supplyName: string
  @column()
  description: string
  @column()
  isArchived: boolean
  @column()
  status : any

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // @computed()
  // public get status() {
  //   let _stocks : any;
  //   // return SupplyStock.query().where('supply_item_id', this.id)
  //   // .then((val)=>{
  //   //   _stocks = val
  //   //   return val
  //   //   console.log("first")
  //   // })
  //   // (async()=>{
  //   //   await SupplyStock.query().where('supply_item_id', this.id)
  //   //   console.log("first")
  //   //   console.log("second")
  //   // })()
  //   // return _stocks;
  //   return "Needs restocking"
  // }

  // unfinished
  async acquireStatus(){
    const stocks = await SupplyStock.query().where('supply_item_id', this.id)
    return stocks
  }
}

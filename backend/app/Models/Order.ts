import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, computed, hasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import OrderItem from './OrderItem'
import OrderStatusHistory from './OrderStatusHistory'

export default class Order extends BaseModel {
  static table = "orders"

  @column({ isPrimary: true })
  public id: number

  @column()
  qrId: string
  @column()
  notes: string
  @column()
  address: string
  @column()
  modeOfPaymentId: number
  @column()
  userId: number
  @column()
  isPos: boolean
  @column()
  deliveryTypeId: number
  @column()
  status: string
  @column()
  tableNo: number
  @column()
  deliveryCharge: number
  @column()
  location: any

  @column.dateTime()
  dateOrdered: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public user : BelongsTo<typeof User>

  @hasMany(()=>OrderItem)
  public orderItems : HasMany<typeof OrderItem>

  @hasMany(()=>OrderStatusHistory)
  public orderStatusHistory : HasMany<typeof OrderStatusHistory>

  @computed()
  public get total() : any {
    if(!this.orderItems){
      return null
    }
    let total = this.deliveryCharge ? this.deliveryCharge : 0
    this.orderItems.forEach((item:any)=>{
      total += item.price * item.quantity
    })
    return total 
  }
  

}

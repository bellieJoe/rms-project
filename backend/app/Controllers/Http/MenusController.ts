// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from "@ioc:Adonis/Lucid/Database";
import DeliveryType from "App/Models/DeliveryType";
import Order from "App/Models/Order";
import OrderItem from "App/Models/OrderItem";
import OrderStatusHistory from "App/Models/OrderStatusHistory";
import ProductCategory from "App/Models/ProductCategory";
import ProductItem from "App/Models/ProductItem";
import ProductVariant from "App/Models/ProductVariant";
import { DateTime } from "luxon";

export default class MenusController {

    async init () {
        const categories = await ProductCategory.query()
        .preload('productItems', (q) => {
            q.where('in_menu', 1)
            .where('is_archived', 0)
            q.preload('productVariants', (q) => {
                q.where('in_menu', 1)
                .where('is_archived', 0)
            })
        })
        .where('is_archived', 0)
        return this.finalizeMenu(categories)
    }

    async initOnline () {
        const categories = await ProductCategory.query()
        .where('is_archived', 0)
        .preload('productItems', (q) => {
            q.where('in_menu', 1)
            .where('is_archived', 0)
            q.preload('productVariants', (q) => {
                q.where('in_menu', 1)
                .where('online_availability', 1)
                .where('is_archived', 0)
            })
        })
        return this.finalizeMenu(categories)
    }

    async placeOrderPOS({request}){
        await Database.transaction(async (trx)=>{
            const items = request.input('items')
            
            const order = await Order.create({
                dateOrdered: DateTime.local(),
                notes: request.input('notes'),
                tableNo: request.input('table_no'),
                userId: request.input('user_id'),
                isPos: true,
                status: 'Processing'
            })
            order.useTransaction(trx)
            const cleanOrderItems = this.cleanOrderItemsData(request.input('items'), order.id)
            const orderItems = await OrderItem.createMany([...cleanOrderItems])
            order.useTransaction(trx)
            await OrderStatusHistory.create({
                status: 'Processing',
                orderId: order.id,
                notes: 'Order created using POS',
            })
            order.useTransaction(trx)
        })
    }

    async placeOrderOnline({request}){
        await Database.transaction(async (trx)=>{
            const items = request.input('items')
            console.log(request)
            const order = await Order.create({
                dateOrdered: DateTime.local(),
                notes: request.input('notes'),
                userId: request.input('user_id'),
                deliveryTypeId: request.input('delivery_type_id'),
                address: request.input('address'),
                isPos: false,
                status: 'Pending',
                location: request.input('location'),
                deliveryCharge: request.input('delivery_charge'),
            })
            order.useTransaction(trx)
            const cleanOrderItems = this.cleanOrderItemsData(request.input('items'), order.id)
            const orderItems = await OrderItem.createMany([...cleanOrderItems])
            order.useTransaction(trx)
            await OrderStatusHistory.create({
                status: 'Processing',
                orderId: order.id,
                notes: 'Order created using POS',
            })
            order.useTransaction(trx)
        })
    }

    private cleanOrderItemsData(data: any, order_id:number){
        const cleanData  = data.map((val:any)=>{
            return {
                productVariantId: val.variant.id,
                price: val.variant.price,
                quantity: val.quantity,
                order_snapshot: val,
                orderId : order_id
            }
        })
        return cleanData
    }

    async getDeliveryTypes({request}) {
        const delivery_types = DeliveryType.all()
        return delivery_types
    }

    finalizeMenu(categories : any){
        return categories.map((category:any, i:number)=>{
            category.productItems = category.productItems.filter((item:any, j:number)=>{
                return item.productVariants.length > 0 ? true : false
            })
            return category;
        })
        
    }

    async generateRecommendations(){
        const to = DateTime.now()
        const from = to.minus({days: 30})
        const variants = await ProductVariant.query()
        .where('is_archived', 0)
        .where('in_menu', 1)
        .where('online_availability', 1)
        .preload('orderItems', (q)=>{
            q.whereBetween('created_at', [from.toFormat('y-MM-dd'), to.toFormat('y-MM-dd')])
            
        })
        .withCount('orderItems',  (q)=>{
            q.whereBetween('created_at', [from.toFormat('y-MM-dd'), to.toFormat('y-MM-dd')])
            q.as('orderItemsCount')
        })
        
        let variants_w_count : any = variants.map((variant)=>{
            return {
                product_item_id : variant.productItemId,
                orderItemsCount : variant.$extras.orderItemsCount
            }
        }) 
        variants_w_count.sort((a:any,b:any)=>{
            if (a.orderItemsCount > b.orderItemsCount) {
                return -1;
              }
              if (a.orderItemsCount < b.orderItemsCount) {
                return 1;
              }
            
              return 0; 
        })
        variants_w_count = variants_w_count.filter(val => {
            return val.orderItemsCount != 0
        })
        variants_w_count = variants_w_count.filter((val, i) => {
            return i < 4
        })
        variants_w_count = variants_w_count.map(val=>{
            return val.product_item_id
        })
        // return variants_w_count
        
        const items = await ProductItem.query().where('in_menu', 1)
        .preload('productCategory')
        .preload('productVariants')
        // return items


        return {
            best_sellers : items,
            personalize: null,
        }
    }

    async suggestProdByRecentOrders(){
        
    }
}

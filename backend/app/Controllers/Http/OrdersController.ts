// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from "@ioc:Adonis/Lucid/Database";
import Order from "App/Models/Order";
import OrderItem from "App/Models/OrderItem";
import OrderStatusHistory from "App/Models/OrderStatusHistory";
import { DateTime } from "luxon";

export default class OrdersController {
    async getPending(){
        const orders = Order.query().where('status', 'Pending')
    }
    async getProcessing(){
        const orders = Order.query().where('status', 'Processing').paginate(1, 30)
        return (await orders).all()
    }

    async index({request}) {
        const orders = Order.query().orderBy('created_at', 'desc')
        const order_id = request.input('order_id')
        const page = request.input('page')
        const status = request.input('status')
        const start_date = request.input('start_date')
        const end_date = request.input('end_date')
        if(status && status != 'All'){
            await orders.where('status', request.input('status'))
        }
        if(order_id){
            await orders.where('id', request.input('order_id'))
        }   
        if(start_date && end_date){
            await orders.whereBetween('date_ordered', [request.input('start_date'), request.input('end_date')])
        }
        else if(!start_date && end_date){
            await orders.whereRaw(`date_ordered <= '${request.input('end_date')}'`)
        }
        else if(start_date && !end_date){
            await orders.whereRaw(`date_ordered >= '${request.input('start_date')}'`)
        }
        await orders.preload('user' , async (q) => {
            await q.preload('userProfile')
        })
        await orders.paginate(page, 30)
        return orders
    }

    async customerOrders({request}) {
        const orders = Order.query().where('user_id', request.input('user_id')).orderBy('created_at', 'desc')
        const order_id = request.input('order_id')
        const page = request.input('page')
        const status = request.input('status')
        const start_date = request.input('start_date')
        const end_date = request.input('end_date')
        if(status && status != 'All'){
            await orders.where('status', request.input('status'))
        }
        if(order_id){
            await orders.where('id', request.input('order_id'))
        }   
        if(start_date && end_date){
            await orders.whereBetween('date_ordered', [request.input('start_date'), request.input('end_date')])
        }
        else if(!start_date && end_date){
            await orders.whereRaw(`date_ordered <= '${request.input('end_date')}'`)
        }
        else if(start_date && !end_date){
            await orders.whereRaw(`date_ordered >= '${request.input('start_date')}'`)
        }
        await orders.preload('user' , async (q) => {
            await q.preload('userProfile')
        })
        await orders.paginate(page, 30)
        return orders
    }

    async posMarkAsCompleted({request}){
        return await Database.transaction(async (trx) =>{
            const order_id = request.input('order_id');
            const order = await Order.find(order_id);
            order!.status = 'Completed';
            await order?.save()
            order?.useTransaction(trx)
            await OrderStatusHistory.create({
                orderId: order_id,
                notes: 'Order was completed',
            })
            order?.useTransaction(trx)
            await order?.load('user', async (q)=>{
                await q.preload('userProfile')
            })
            return order
        })
    }

    async fetchItems({request})
    {
        const order_id = request.input('order_id')
        const items = await OrderItem.query().where('order_id', order_id)
        return items
    }

    async customerCancel({request}) {
        const order = await Order.find(request.input('order_id'))
        order!.status =  "Canceled"
        order?.save()
        await order!.load('user' , async (q) => {
            await q.preload('userProfile')
        })
        await OrderStatusHistory.create({
            reason: request.input('reason'),
            orderId: request.input('order_id'),
            notes: `Order was canceled by ${order?.user.userProfile.name}`
        })
        return order
        
    }

    async storeCancel({request}){
        await Database.transaction(async (trx)=>{
            const order_id = request.input('order_id')
            
            const order = await Order.find(order_id)
            order!.status = 'Canceled';
            await order?.save()
            order!.useTransaction(trx)
            await OrderStatusHistory.create({
                status: 'Canceled',
                orderId: order_id,
                notes: 'Order was canceled by the store',
            })
            order!.useTransaction(trx)
        })
    }

    async storeProcess({request}){
        await Database.transaction(async (trx)=>{
            const order_id = request.input('order_id')
            
            const order = await Order.find(order_id)
            order!.status = 'Processing';
            await order?.save()
            order!.useTransaction(trx)
            await OrderStatusHistory.create({
                status: 'Processing',
                orderId: order_id,
                notes: 'Store has processed the order',
            })
            order!.useTransaction(trx)
        })
    }
    async markAsDelivery({request}){
        await Database.transaction(async (trx)=>{
            const order_id = request.input('order_id')
            
            const order = await Order.find(order_id)
            order!.status = 'In Delivery';
            await order?.save()
            order!.useTransaction(trx)
            await OrderStatusHistory.create({
                status: 'In Delivery',
                orderId: order_id,
                notes: 'Store has marked the order as Reeady for Delivery',
            })
            order!.useTransaction(trx)
        })
    }
}

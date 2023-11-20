// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Order from "App/Models/Order";

export default class OrdersController {
    async getPending(){
        const orders = Order.query().where('status', 'Pending')
    }
    async getProcessing(){
        const orders = Order.query().where('status', 'Processing').paginate(1, 30)
        return (await orders).all()
    }

    async index({request}) {
        const orders = Order.query()
        const order_id = request.input('order_id')
        const page = request.input('page')
        const status = request.input('status')
        const start_date = request.input('start_date')
        const end_date = request.input('end_date')
        if(status && status != 'All'){
            await orders.where('status', request.input('status'))
        }
        if(order_id){
            await orders.where('order_id', request.input('order_id'))
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
        await orders.paginate(page, 30)
        return orders
    }
}

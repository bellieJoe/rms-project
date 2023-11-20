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
        if(request.input('status') && request.input('status') != 'All'){
            await orders.where('status', request.input('status'))
        }
        if(request.input('order_id')){
            await orders.where('order_id', request.input('order_id'))
        }   
        if(request.input('start_date') && request.input('end_date')){
            await orders.whereBetween('date_ordered', [request.input('start_date'), request.input('end_date')])
        }
        else if(!request.input('start_date') && request.input('end_date')){
            await orders.whereRaw(`date_ordered > ${request.input('end_date')}`)
        }
        else if(request.input('start_date') && !request.input('end_date')){
            await orders.whereRaw(`date_ordered > ${request.input('start_date')}`)
        }
        await orders.paginate(request.input('page'), 2)
        return orders
    }
}

// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { DateTime } from "luxon"
import OrdersController from "./OrdersController"
import Order from "App/Models/Order"
import _ from 'lodash'

export default class SalesController {
    async monthly({request}){
        const start = DateTime.fromObject({
            month: request.input('month'),
            year: request.input('year'),
            day: 1
        })
        const end = start.endOf('month')
        const orders = await Order.query()
        .where('status', 'Completed')
        .whereBetween('date_ordered', [start.toFormat('y-M-d'), end.toFormat('y-M-d')])
        .preload('orderItems', (q)=>{
            q.select('id', 'product_variant_id', 'price', 'quantity', 'order_id')
        })
        return orders
    }



    async yearly({request}){
        return "ok"
    }
}

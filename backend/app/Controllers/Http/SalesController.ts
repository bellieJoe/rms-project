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
        return orders;
    }

    async yearly({request}){
        const start = DateTime.fromObject({
            month: 1,
            year: request.input('year'),
            day: 1
        })
        const end = DateTime.fromObject({
            month: 12,
            year: request.input('year'),
            day: 31
        })
        const orders = await Order.query()
        .where('status', 'Completed')
        .whereBetween('date_ordered', [start.toFormat('y-M-d'), end.toFormat('y-M-d')])
        .preload('orderItems', (q)=>{
            q.select('id', 'product_variant_id', 'price', 'quantity', 'order_id')
        })
        return orders;
    }

    async daily({request}){
        const start = DateTime.fromObject({
            month: request.input('month'),
            year: request.input('year'),
            day: request.input('day'),
            minute: 0,
            hour: 0,
            second: 0
        })
        const end = DateTime.fromObject({
            month: request.input('month'),
            year: request.input('year'),
            day: request.input('day'),
            minute: 59,
            hour: 23,
            second: 59
        })
        const orders = await Order.query()
        .where('status', 'Completed')
        .whereBetween('date_ordered', [start.toFormat('y-M-d H:m:s'), end.toFormat('y-M-d H:m:s')])
        .preload('orderItems', (q)=>{
            q.select('id', 'product_variant_id', 'price', 'quantity', 'order_id')
        })
        return orders;
    }
}

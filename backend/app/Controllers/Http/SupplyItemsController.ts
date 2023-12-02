// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import SupplyItem from "App/Models/SupplyItem";

export default class SupplyItemsController {
    async store ({request}) {
        const item = await SupplyItem.create({
            supplyName: request.input('name'),
            specifications: request.input('specifications'),
            critical_level: request.input('critical_level'),
        })
    }

    async index({request}){
        const _products = await SupplyItem.query()
        .paginate(request.input('page'), 20)
        return _products.all();
    }

    async searchByName({request}){
        const items = await SupplyItem.query().where('supply_name', 'like', `%${request.input('keyword')}%`)
        return items;
    }
}

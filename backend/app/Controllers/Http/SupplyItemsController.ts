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

    async edit ({request}) {
        const item = await SupplyItem.find(request.input('id'))
        item!.supplyName = request.input('name')
        item!.critical_level = request.input('critical_level')
        item!.specifications = request.input('specifications')
        await item?.save()
        return item
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

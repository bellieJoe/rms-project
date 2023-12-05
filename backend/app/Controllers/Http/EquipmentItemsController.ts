// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import EquipmentItem from "App/Models/EquipmentItem";

export default class EquipmentItemsController {
    async store ({request}) {
        const _item = await EquipmentItem.create({
            name: request.input('name'),
            specifications: request.input('specifications'),
        })
    }

    async index({request}){
        const _items = await EquipmentItem.query()
        .paginate(request.input('page'), 20)
        return _items.all();
    }

    async searchItemsByName({request}){
        const items = await EquipmentItem.query().where('name', 'like', `%${request.input('keyword')}%`)
        return items;
    }

    async editItem({request}){
        const item = await EquipmentItem.find(request.input('id'))
        item!.name = request.input('name')
        item!.specifications = request.input('specifications')
        await item?.save()
        return item
    }
}

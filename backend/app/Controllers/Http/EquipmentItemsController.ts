// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import EquipmentItem from "App/Models/EquipmentItem";
import EquipmentStock from "App/Models/EquipmentStock";
import { DateTime } from "luxon";

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

    async addStocks({request}){
        const _stocks_data : any[] = []
        const inputs = {
            equipment_item_id : request.input('equipment_item_id'),
            batch_no : request.input('batch_no'),
            amount : request.input('amount'),
            date_added : request.input('date_added'),
            equipmentStatus : request.input('equipment_status'),
        }
        for (let i = 1; i <= inputs.amount; i++) {
            _stocks_data.push({
                equipmentItemId : inputs.equipment_item_id,
                batchNo : inputs.batch_no,
                dateAdded : inputs.date_added,
                eqStockNo : `${inputs.batch_no}-EN-${DateTime.now().toMillis()}-${i}`,
                equipmentStatus : inputs.equipmentStatus
            })
        }
        const _stocks = await EquipmentStock.createMany([..._stocks_data])
        return _stocks
    }
}

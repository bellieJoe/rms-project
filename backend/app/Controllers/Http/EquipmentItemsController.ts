// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import EquipmentItem from "App/Models/EquipmentItem";
import EquipmentStock from "App/Models/EquipmentStock";
import Equipment from "Database/seeders/Equipment";
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
            date_added :  DateTime.now().toFormat('y-f-d'),
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

    async stocks({request}){
        const batch_no = request.input('batch_no')
        const eq_stock_no = request.input('eq_stock_no')
        const equipment_name = request.input('equipment_name')
        const equipment_status = request.input('equipment_status')
        const _stocks_query = EquipmentStock.query()
        if(batch_no){
            _stocks_query.where('batch_no', batch_no)
        }
        if(equipment_status){
            _stocks_query.where('equipment_status', equipment_status)
        }
        if(eq_stock_no){
            _stocks_query.where('eq_stock_no', eq_stock_no)
        }
        if(equipment_name){
            const _eq_items_id = (await EquipmentItem.query().select('id').where('name', 'like', `%${equipment_name}%`)).map((item)=>{
                return item.id
            })
            _stocks_query.whereIn('equipment_item_id',[..._eq_items_id])
        }
        return await _stocks_query
    }

    async changeStockStatus({request}){
        const equipment_stock_id = request.input('equipment_stock_id')
        const equipment_status = request.input('equipment_status')
        const _stock = await EquipmentStock.find(equipment_stock_id)
        _stock!.equipmentStatus = equipment_status
        await _stock?.save()
        return _stock
    }
}

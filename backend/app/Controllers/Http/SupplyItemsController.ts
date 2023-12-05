// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import SupplyItem from "App/Models/SupplyItem";
import SupplyStock from "App/Models/SupplyStock";

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
        const _items = await SupplyItem.query()
        .paginate(request.input('page'), 20)
        let _res : any = []
        await new Promise((resolve)=>{
            _items.all().forEach(async(item, i)=>{
                item.status = await item.acquireStatus()
                console.log(item.serialize())
                _res.push(item)
                if(_items.all().length == (i+1)){
                    resolve(null)
                }
            })
        })
        console.log("second")
        return _res;
    }

    async searchByName({request}){
        const items = await SupplyItem.query().where('supply_name', 'like', `%${request.input('keyword')}%`)
        return items;
    }

    async addSupplyStocks({request}){
        const stock = SupplyStock.create({
            supplyItemId : request.input('supply_item_id'),
            batchNo : request.input('batch_no'),
            stockAmount : request.input('stock_amount'),
            expirationDate: request.input('expiration_date'),
        })
        return stock
    }

    async getSupplyStocksBySupplyItemId({request}){
        const supply_item_id = request.input('supply_item_id')
        let _stocks : any = SupplyStock.query().where('supply_item_id', supply_item_id)
        await _stocks.preload('supplyTransRecords')
        let stocks = await _stocks
        stocks = stocks.map(stock=>{
            const _stock = stock.serialize();
            _stock.remaining = stock.stockAmount;
            _stock.amountConsumed = 0;
            stock.supplyTransRecords.forEach(rec=>{
                _stock.amountConsumed += rec.amount
            })
            _stock.remaining = stock.stockAmount - _stock.amountConsumed
            return _stock;
        })
        return stocks;
    }
}

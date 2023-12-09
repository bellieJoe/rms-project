// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import AppSetting from "App/Models/AppSetting";

export default class AppSettingsController {
    async index(){
        return await AppSetting.first()
    }

    async update({request}){
        const id = request.input('id')
        const delivery_radius_m = request.input('delivery_radius_m')
        const delivery_excess_charge_per_minute = request.input('delivery_excess_charge_per_minute')
        const delivery_charge = request.input('delivery_charge')
        const normal_delivery_duration_m = request.input('normal_delivery_duration_m')
        const store_location = request.input('store_location')
        const _s = await AppSetting.first()
        _s!.deliveryRadiusM = delivery_radius_m
        _s!.deliveryExcessChargePerMinute = delivery_excess_charge_per_minute
        _s!.deliveryCharge = delivery_charge
        _s!.normalDeliveryDurationM = normal_delivery_duration_m
        _s!.storeLocation = JSON.stringify(store_location)
        await _s?.save()
        return _s;
    }
}

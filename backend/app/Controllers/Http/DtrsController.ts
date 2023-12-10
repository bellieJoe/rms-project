// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Dtr from "App/Models/Dtr";

export default class DtrsController {

    async store({request}){
        const _date = request.input('date')
        const _in = request.input('in')
        const _out = request.input('out')
        const _employee_id = request.input('employee_id')
        const _dtr = await Dtr.query().where('date', _date).where('employee_id', _employee_id).first();
        if(_dtr){
            _dtr.in = _in
            _dtr.out = _out
            await _dtr.save()
            return _dtr
        }
        const dtr = await Dtr.create({
            date: _date,
            in: _in,
            out: _out,
            employeeId: _employee_id
        })
        return dtr
    }

    async getByDate({request}){
        const date = request.input('date')
        const employee_id = request.input('employee_id')
        const dtr = await Dtr.query().where('date', date).where('employee_id', employee_id).first()
        return dtr
    }
}

// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from "@ioc:Adonis/Lucid/Database"
import Employee from "App/Models/Employee"
import ServiceRecord from "App/Models/ServiceRecord"
import { DateTime } from "luxon"

export default class EmployeesController {
    async store({request, response}){
        const user_id = request.input('user_id')
        const position = request.input('position')
        const per_day_salary = request.input('per_day_salary')

        const _isEmployeeQuery = await Employee.query().where('user_id', user_id).where('is_active', 1).first()
        if(_isEmployeeQuery){
            return response.abort('User is already an employee', 419)
        }
        const _isEmployeeBeforeQuery = await Employee.query().where('user_id', user_id).where('is_active', 0).first()
        if(_isEmployeeBeforeQuery){
            await Database.transaction(async(trx) => {
                _isEmployeeBeforeQuery.isActive = true;
                await _isEmployeeBeforeQuery.save()
                _isEmployeeBeforeQuery.useTransaction(trx)
                await ServiceRecord.create({
                    employeeId: _isEmployeeBeforeQuery.id,
                    from: DateTime.now().toFormat('y-M-d'),
                    isActive: true,
                    position: position,
                    perDaySalary: per_day_salary,
                })
                _isEmployeeBeforeQuery.useTransaction(trx)
                return _isEmployeeBeforeQuery
            })
            return _isEmployeeBeforeQuery
        }

        const _newEmployeeQuery = await Employee.create({
            userId: user_id,
            isActive: true,
            privilegeLevel: 2
        })
        await _newEmployeeQuery.related('serviceRecords').create({
            from: DateTime.now().toFormat('y-M-d'),
            isActive: true,
            perDaySalary: per_day_salary,
            position: position
        })
        return _newEmployeeQuery;


    }

    async test(){
        return DateTime.now().toFormat('y-M-d')
    }

    async index({request}){
        // const is_active = request.input('is_active')
        const _employees = await Employee.query().where('is_active', 1).preload('serviceRecords', (q)=>{
            q.where('is_active', 1)
        })
        .preload('user', (q)=>{
            q.preload('userProfile')
        })
        return _employees
    }

    async endEmployment({request}){
        const employee_id = request.input('employee_id')
        const _emp = await Employee.find(employee_id)
        _emp!.isActive = false
        await _emp?.save()
        const _service_record = await ServiceRecord.query().where('employee_id', employee_id).where('is_active', 1).first()
        _service_record!.isActive = false
        _service_record!.to = DateTime.now().toFormat('y-M-d')
        _service_record?.save()
    }
    async dashboard({request}){
        return {
            employee_count: (await Employee.all()).length,
            employee_active_count: (await Employee.query().where('is_active', 1)).length,
            employee_inactive_count: (await Employee.query().where('is_active', 0)).length,
        }
    }

}

// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Dtr from "App/Models/Dtr"
import Employee from "App/Models/Employee"
import Payroll from "App/Models/Payroll"

export default class PayrollsController {
    async test({request}){
        const from = request.input('from')
        const to = request.input('to')
        
        const _dtrs = await Dtr.query().select('employee_id').whereBetween('date', [from, to]).orWhere('date', from).orWhere('date', to).groupBy('employee_id')
        const _emp_ids = _dtrs.map((val)=>{
            return val.employeeId
        })
        const _employees = await Employee.query().whereIn('id', _emp_ids)
        .preload('serviceRecords', (q)=>{
            q.where('is_active', 1)
        })
        .withCount('dtrs', (q)=>{
            q.whereBetween('date', [from, to]).orWhere('date', from).orWhere('date', to)
            q.as('totalDtrs')
        })
        .preload('dtrs', (q)=>{
            q.whereBetween('date', [from, to]).orWhere('date', from).orWhere('date', to)
        })
        const _payroll_data = _employees.map((emp)=>{
            return {
                from : from,
                to: to,
                employeeId : emp.id,
                daysWorked : emp.$extras.totalDtrs,
                netPay : (emp.$extras.totalDtrs * emp.serviceRecords[0].perDaySalary)
            }
        })
        return _payroll_data
    }

    async generatePayroll({request}){
        const from = request.input('from')
        const to = request.input('to')
        
        const _dtrs = await Dtr.query().select('employee_id').whereBetween('date', [from, to]).orWhere('date', from).orWhere('date', to).groupBy('employee_id')
        const _emp_ids = _dtrs.map((val)=>{
            return val.employeeId
        })
        const _employees = await Employee.query().whereIn('id', _emp_ids)
        .preload('serviceRecords', (q)=>{
            q.where('is_active', 1)
        })
        .withCount('dtrs', (q)=>{
            q.whereBetween('date', [from, to]).orWhere('date', from).orWhere('date', to)
            q.as('totalDtrs')
        })
        .preload('dtrs', (q)=>{
            q.whereBetween('date', [from, to]).orWhere('date', from).orWhere('date', to)
        })
        const _payroll_data = _employees.map((emp)=>{
            return {
                from : from,
                to: to,
                employeeId : emp.id,
                daysWorked : emp.$extras.totalDtrs,
                netPay : (emp.$extras.totalDtrs * emp.serviceRecords[0].perDaySalary)
            }
        })
        const _payrolls = await Payroll.createMany([..._payroll_data])
        return _payrolls
    }

    async index({request}){
        const from = request.input('from')
        const to = request.input('to')
        const _payrolls = await Payroll.query().where('from','>=', from).andWhere('to','<=', to)
        .preload('employee', (q)=>{
            q.preload('user', (q1)=>{
                q1.preload('userProfile')
            })
            .preload('serviceRecords', (q1)=>{
                q1.where('is_active', 1)
            })
        })
        return _payrolls
    }
}

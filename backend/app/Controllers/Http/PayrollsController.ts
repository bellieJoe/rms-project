// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Dtr from "App/Models/Dtr"
import Employee from "App/Models/Employee"
import Payroll from "App/Models/Payroll"
import PayrollRange from "App/Models/PayrollRange"
import { DateTime } from "luxon"

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

    async generatePayroll({request, response}){
        const from = request.input('from')
        const to = request.input('to')

        // validate range duplication
        const _existing_payroll_ranges = await PayrollRange.query().where('from', from).where('to', to).where('is_deleted', 0)
        if(_existing_payroll_ranges && _existing_payroll_ranges.length > 0){
            return response.abort('Duplicate Payroll detected')
        }
        
        // generate payroll range
        const _payroll_range = await PayrollRange.create({
            from : from,
            to: to,
            isDeleted : false
        })

        // tabulate Employee DTR
        const _dtrs = await Dtr.query().select('employee_id').whereBetween('date', [from, to]).orWhere('date', from).orWhere('date', to).groupBy('employee_id')
        const _emp_ids = _dtrs.map((val)=>{
            return val.employeeId
        })
        const _employees = await Employee.query()
        .whereIn('id', _emp_ids)
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
                payroll_range_id :_payroll_range.id,
                isRemitted : false,
                isDeleted : false,
                employeeId : emp.id,
                daysWorked : emp.$extras.totalDtrs,
                netPay : (emp.$extras.totalDtrs * emp.serviceRecords[0].perDaySalary)
            }
        })
        const _payrolls = await Payroll.createMany([..._payroll_data])
        return _payrolls
    }

    // async index({request}){
    //     const from = request.input('from')
    //     const to = request.input('to')
    //     const employee_id = request.input('employee_id')
    //     if(employee_id){
    //         const _payrolls = await Payroll.query().where('employee_id', employee_id).where('from','>=', from).andWhere('to','<=', to)
    //         .preload('employee', (q)=>{
    //             q.preload('user', (q1)=>{
    //                 q1.preload('userProfile')
    //             })
    //             .preload('serviceRecords', (q1)=>{
    //                 q1.where('is_active', 1)
    //             })
    //         })
    //         return _payrolls
    //     }
    //     const _payrolls = await Payroll.query().where('from','>=', from).andWhere('to','<=', to)
    //     .preload('employee', (q)=>{
    //         q.preload('user', (q1)=>{
    //             q1.preload('userProfile')
    //         })
    //         .preload('serviceRecords', (q1)=>{
    //             q1.where('is_active', 1)
    //         })
    //     })
    //     return _payrolls
    // }

    async index({request}) {
        const year = request.input('year')
        const firstDay = DateTime.fromISO(`${year}-01-01`);
        const lastDay = DateTime.fromISO(`${year}-12-31`);
        const payroll_ranges = await PayrollRange.query()
        .where('isDeleted', 0)
        .whereBetween('to', [firstDay.toFormat("y-M-d"), lastDay.toFormat('y-M-d')])
        .whereBetween('from', [firstDay.toFormat("y-M-d"), lastDay.toFormat('y-M-d')])
        .orderBy('created_at', 'desc')
        return payroll_ranges
    }

    async getList({request}){
        const payroll_range_id = request.input('payroll_range_id')
        const payrolls = await Payroll.query().where('payroll_range_id', payroll_range_id).where('is_deleted', false)
        .preload('employee', function(q){
            q.preload('serviceRecords').preload('user',function(q){
                q.preload('userProfile')
            })
        })
        return payrolls
    }

    async deletePayrollRange({request}){
        const payroll_range_id = request.input('payroll_range_id')
        const payroll_range = await PayrollRange.find(payroll_range_id)
        payroll_range!.isDeleted = true
        await payroll_range?.save()
    }
}

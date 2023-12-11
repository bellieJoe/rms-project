// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Hash from '@ioc:Adonis/Core/Hash'
import User from "App/Models/User";
import UserProfile from "App/Models/UserProfile";

import Database from '@ioc:Adonis/Lucid/Database';
import MailController from './MailController';
import { DateTime } from 'luxon';


export default class UsersController {

    async index({request}){
        const users = await User.query().preload('userProfile').paginate(request.input('page'), 20)
        return users.all();
    }

    async searchByName({request}){
        const usersProfileQuery = UserProfile.query()
        const userProfiles = await usersProfileQuery.where('name', 'like', `%${request.input('keyword')}%`)
        const userIds =  userProfiles.map((userProfile : UserProfile) => {
            return userProfile.userId
        })
        const users = await User.query().whereIn('id', userIds).preload('userProfile')
        return users;
    }

    async register({request}){
        return "sad";
        return UserProfile.all()
    }

    async signin({request, response}){
        var user : any  = await User.findBy("email", request.input("email"))
        if(!user){
            return await response.notFound({error: "Account not found"})
        }

        if(!(await Hash.verify(user.password, request.input('password')))){
            return await response.unauthorized({error: "Invalid Password"})
        }

        await user.load('userProfile')
        return user;
    }

    async signinEmployee({request, response}){
        var user : any  = await User.findBy("email", request.input("email"))
        if(!user){
            return await response.notFound({error: "Account not found"})
        }

        if(!(await Hash.verify(user.password, request.input('password')))){
            return await response.unauthorized({error: "Invalid Password"})
        }

        await user.load('userProfile')
        await user?.load('employee', (q)=>{
            q.where('is_active', 1)
            q.preload('serviceRecords', (q)=>{
                q.where('is_active', 1)
            })
        })

        if(!user.employee){
            return await response.unauthorized({error: "Unauthorized Access"})
        }
        return user;
    }

    async addUser({request, response}){
        await Database.transaction(async (trx)=>{
            const user = await User.create({
                email: request.input('email'),
                password: await Hash.make(request.input('password'))
            })
            user.useTransaction(trx)
            await user.related('userProfile').create({
                name: request.input('name'),
                contactNumber: request.input('contactNumber')
            })
            await user.load('userProfile')
            user.useTransaction(trx)
            MailController.sendEmail(
                'emails/welcome', 
                {
                    name: user.userProfile.name,
                },
                user.email
            )
        })
    }

    async signup({request, response}){
        await Database.transaction(async (trx)=>{
            const user = await User.create({
                email: request.input('email'),
                password: await Hash.make(request.input('password'))
            })
            user.useTransaction(trx)
            await user.related('userProfile').create({
                name: request.input('name'),
                contactNumber: request.input('contactNumber')
            })
            await user.load('userProfile')
            user.useTransaction(trx)
            MailController.sendEmail(
                'emails/welcome', 
                {
                    name: user.userProfile.name,
                },
                user.email
            )
        })
    }

    async emailInUsed({request, response}){
        const user = await User.findBy('email', request.params('email').email)
        if(!user){
            return response.notFound()
        }
        return user;
    }

    async test({request}){
        const user = await User.findBy('email', 'admin@email.com')
        await user?.load('userProfile')
        await user?.load('employee', (q)=>{
            q.where('is_active', 1)
            q.preload('serviceRecords', (q)=>{
                q.where('is_active', 1)
            })
        })
        return user;
    }

    async editProfile({request}){
        const userProfile = await UserProfile.query().where('user_id', request.input('user_id')).first()
        userProfile!.name = request.input('name')
        userProfile!.contactNumber = request.input('contact_number')
        await userProfile?.save()
        const user = await User.find(request.input('user_id'))
        await user?.load('userProfile')
        return user
    }

    async sendVerificationEmail({request}){
        const code = request.input('code')
        const email = request.input('email')
        MailController.sendEmail(
            'emails/verification', 
            {
                code: code,
            },
            email
        )
        return 
    }

    async verifyEmail({request}){
        const email = request.input('email')
        const user = await User.query().where('email', email).first()
        user!.emailVerifiedAt = DateTime.now().toFormat('y-M-d')
        await user?.save()
        await user?.load('userProfile')
        return user
    }

    

}

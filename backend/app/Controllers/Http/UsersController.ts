// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Hash from '@ioc:Adonis/Core/Hash'
import User from "App/Models/User";
import UserProfile from "App/Models/UserProfile";
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import { messages } from './ValidationController';
import Database from '@ioc:Adonis/Lucid/Database';
import Mail from '@ioc:Adonis/Addons/Mail';
import View from '@ioc:Adonis/Core/View';
import MailController from './MailController';


export default class UsersController {

    async index({request}){

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
            await MailController.sendEmail(
                'emails/welcome', 
                {
                    name: user.userProfile.name,
                },
                user.email
            )
            user.useTransaction(trx)
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
        return user;
    }

    

}

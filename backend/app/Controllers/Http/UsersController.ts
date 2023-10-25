// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Hash from '@ioc:Adonis/Core/Hash'
import User from "App/Models/User";
import UserProfile from "App/Models/UserProfile";
import { schema, rules } from '@ioc:Adonis/Core/Validator';

export default class UsersController {
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

    async addUser({request}){
        const newUserSchema = schema.create({
            name: schema.string({}, [
                rules.maxLength(100)
            ]),
            email: schema.string({}, [
                rules.email(),
                rules.maxLength(100),
                rules.unique({table: 'users', column: 'email'})
            ]),
            contactNumber: schema.string({}, [
                rules.maxLength(11),
                rules.minLength(11)
            ]),
            password: schema.string({}, [
                rules.email(),
                rules.minLength(8)
            ])
        })

        const payload = await request.validate({ schema: newUserSchema })
    }

}

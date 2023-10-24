// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Hash from '@ioc:Adonis/Core/Hash'
import User from "App/Models/User";
import UserProfile from "App/Models/UserProfile";

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

        user?.load('userProfile')
        return user;
    }

}

// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from "App/Models/User";
import UserProfile from "App/Models/UserProfile";

export default class UsersController {
    async register({request}){
        return UserProfile.all()
    }
    async signin({request}){
        return request;
    }

}

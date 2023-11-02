// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import ProductCategory from "App/Models/ProductCategory";

export default class ProductCategoriesController {
    async store ({request}) {
        const category = ProductCategory.create({
            name: request.input('name'),
            description: request.input('description'),
        })
    }

    async index({request}){
        const categories = await ProductCategory.query().paginate(request.input('page'), 20)
        return categories.all();
    }

    async searchByName({request}){
        const categories = await ProductCategory.query().where('name', 'like', `%${request.input('keyword')}%`)
        return categories;
    }

    async active({request}){
        const categories = await ProductCategory.query().where('is_archived', 0)
        return categories;
    }
}

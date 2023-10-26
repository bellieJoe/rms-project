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
        const categories = await ProductCategory.query().paginate(request.params('page'), 20)
        return categories.all();
    }
}

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
        const categories = await ProductCategory.query().where('is_archived', 0).paginate(request.input('page'), 20)
        return categories.all();
    }

    // async index({request}){
    //     const categories = await ProductCategory.query().paginate(request.input('page'), 20)
    //     return categories.all();
    // }

    async searchByName({request}){
        const categories = await ProductCategory.query().where('name', 'like', `%${request.input('keyword')}%`)
        return categories;
    }

    async active({request}){
        const categories = await ProductCategory.query().where('is_archived', 0)
        return categories;
    }

    async update({request, response}){
        const category = await ProductCategory.find(request.params('id').id)
        category!.name = request.input('name')
        category!.description = request.input('description')
        category!.save()
    }

    async archive({request}){
        const product_category_id = request.input('product_category_id')
        const product_category = await ProductCategory.find(product_category_id)
        product_category!.isArchived = true
        await product_category?.save()
    }
}

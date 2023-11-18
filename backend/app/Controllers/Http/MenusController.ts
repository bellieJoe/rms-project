// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import ProductCategory from "App/Models/ProductCategory";
import ProductCategoriesController from "./ProductCategoriesController";

export default class MenusController {

    async init () {
        const categories = await ProductCategory.query()
        .preload('productItems', (q) => {
            q.where('in_menu', 1)
            q.preload('productVariants', (q) => {
                q.where('in_menu', 1)
            })
            .where('is_archived', 0)
        })
        .where('is_archived', 0)
        return categories
    }
}

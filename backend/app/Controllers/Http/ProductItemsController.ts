// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Application from '@ioc:Adonis/Core/Application'
import ProductItem from "App/Models/ProductItem";
import Drive from '@ioc:Adonis/Core/Drive'

export default class ProductItemsController {
// 
    async store({request}){
        const productItem = await ProductItem.create({
            name: request.input('name'),
            productCategoryId: request.input('product_category'),
            description: request.input('description')
        })
        await productItem.load('productVariants')
        await productItem.load('productCategory')
        return productItem;
    }

    async uploadImage({request, response}){
        const image = request.file('image');
        
        // Check if an image was uploaded
        if (!image) {
            return response.status(400).json({ error: 'No image provided' });
        }
    
        // Move the uploaded file to a desired location
        await image.move(Application.tmpPath(`uploads/product-item-image/${request.input('id')}`), {
            overwrite: true,
            visibility: 'public',
            contentType: 'image/png'
        });

        const productItem = await ProductItem.find(request.input('id'))
        productItem!.image = `product-item-image/${request.input('id')}/blob`
        productItem?.save()
    
        return response.status(200).json({ message: 'Image uploaded successfully' });
    }

    async readImage({request}){
        const url = request.input('url')
        const contents = await Drive.get(url)
        return contents.toString()
    }

    async active({request}){
        const product_category_id = request.input('product_category_id')
        if(product_category_id && product_category_id == 0){
            const _products = await ProductItem.query()
            .preload('productVariants')
            .preload('productCategory')
            .paginate(request.input('page'), 20)
            return _products.all()
        }
        const _products = await ProductItem.query()
        .where('product_category_id', product_category_id)
        .preload('productVariants')
        .preload('productCategory')
        .paginate(request.input('page'), 20)
        return _products.all();
    }

    async searchByName({request}){
        const products = await ProductItem.query().where('name', 'like', `%${request.input('keyword')}%`).preload('productCategory').preload('productVariants')
        return products;
    }

    async update ({request}) {
        const product = await ProductItem.find(request.input('id'))
        product!.productCategoryId = request.input('product_category')
        product!.name = request.input('name')
        product!.description = request.input('description')
        product?.save()
    }

    async getById({request}){
        const item =  await ProductItem.find(request.input('id'))
        await item?.load('productCategory')
        await item?.load('productVariants')
        return item

    }

    async toggleInMenu({request}){
        const item = await ProductItem.find(request.input('id'))
        item!.inMenu = item?.inMenu == 0 ? 1 : 0;
        await item!.save()
        await item?.load('productVariants')
        return item
    }
}

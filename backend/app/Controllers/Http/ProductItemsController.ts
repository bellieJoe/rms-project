// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Application from '@ioc:Adonis/Core/Application'
import ProductItem from "App/Models/ProductItem";
import Drive from '@ioc:Adonis/Core/Drive'
import ProductVariant from 'App/Models/ProductVariant';

export default class ProductItemsController {
// 
    async store({request, response}){
        const _duplicate = await ProductItem.query().where('name', request.input('name')).where('product_category_id', request.input('product_category'))
        if(_duplicate && _duplicate.length > 0){
            return response.abort("Duplicate Product")
        }
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
            .where('is_archived', 0)
            .preload('productVariants')
            .preload('productCategory')
            .paginate(request.input('page'), 20)
            return _products.all()
        }
        const _products = await ProductItem.query()
        .where('product_category_id', product_category_id)
        .where('is_archived', 0)
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

    async archive({request}){
        const product_item_id = request.input('product_item_id')
        const product_item = await ProductItem.find(product_item_id)
        product_item!.isArchived = true
        await product_item?.save()
        await ProductVariant.query().where('product_item_id', product_item_id).update({
            'is_archived' : 1
        })
        // product_variants.forEach
    }
}

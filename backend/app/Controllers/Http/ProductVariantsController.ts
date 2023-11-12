// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import Database from '@ioc:Adonis/Lucid/Database';
import ProductVariant from "App/Models/ProductVariant";

export default class ProductVariantsController {

    async store ({request, response}) {
        await Database.transaction(async(trx)=>{
            let variant = await ProductVariant.create({
                productItemId: request.input('product_item_id'),
                name: request.input('name'),
                description: request.input('description'),
                price: request.input('price'),
            })
            variant.useTransaction(trx)
    
            const imageName = `product-variant-image/${variant.id}/blob`;
    
            const image = request.file('image');
            
            // Check if an image was uploaded
            if (!image) {
                return response.status(400).json({ error: 'No image provided' });
            }
    
            await image.move(Application.tmpPath(`uploads/product-variant-image/${variant.id}`), {
                overwrite: true,
                visibility: 'public',
                contentType: 'image/png'
            });
            variant.useTransaction(trx)
            variant!.image = imageName
            await variant.save()
        })

    }
    
    async getVariantsByProductItemId ({request}) {
        const variants = ProductVariant.query().where('product_item_id', request.input('product_item_id'))
        return variants;
    }

    async update({request, response}){
        return await Database.transaction(async(trx)=>{
            let variant = await ProductVariant.find(request.input('id'))
            if(request.input('name')){
                variant!.name = request.input('name')
            }
            if(request.input('description')){
                variant!.description = request.input('description')
            }
            if(request.input('price')){
                variant!.price = request.input('price')
            }
            variant!.useTransaction(trx)
            await variant!.save()

            if(request.file('image')){
                const imageName = `product-variant-image/${variant!.id}/blob`;
        
                const image = request.file('image');
                
                await image.move(Application.tmpPath(`uploads/product-variant-image/${variant!.id}`), {
                    overwrite: true,
                    visibility: 'public',
                    contentType: 'image/png'
                });
                variant!.useTransaction(trx)
                variant!.image = imageName
            }
            
            return variant
            // variant?.refresh()
            // return response(variant)
            
        })
    }

    async toggleInMenu({request, response}){
        const variant = await ProductVariant.find(request.input('id'))
        variant!.inMenu = variant?.inMenu == 0 ? 1 : 0;
        await variant!.save()
        return variant
    }
}

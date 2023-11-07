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
}

// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Application from '@ioc:Adonis/Core/Application'
import ProductItem from "App/Models/ProductItem";
import Drive from '@ioc:Adonis/Core/Drive'

export default class ProductItemsController {
// 
    async store({request}){
        const productItem = ProductItem.create({
            name: request.input('name'),
            productCategoryId: request.input('product_category'),
            description: request.input('description')
        })

        return productItem;
    }

    async uploadImage({request, response}){
        const image = request.file('image');
        
        // Check if an image was uploaded
        if (!image) {
            return response.status(400).json({ error: 'No image provided' });
        }
    
        // Move the uploaded file to a desired location
        await image.move(Application.tmpPath('uploads/new.png'), {
            overwrite: true,
            visibility: 'public',
            contentType: 'image/png'
        });
    
        return response.status(200).json({ message: 'Image uploaded successfully' });
    }

    async read(){
        const contents = await Drive.get('new.png/blob')
        return contents.toString()
    }
}

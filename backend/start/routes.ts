/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return "Hello World";
})

Route.group(()=>{

  Route.group(() => {
    Route.get('', 'UsersController.index'); 
    Route.get('search-by-name', 'UsersController.searchByName'); 
    Route.get('register', 'UsersController.register'); 
    Route.post('signin', 'UsersController.signin'); 
    Route.post('add-user', 'UsersController.addUser'); 
    Route.get('email-inused/:email', 'UsersController.emailInUsed'); 
    Route.get('test', 'UsersController.index'); 
  }).prefix('/users')

  Route.group(()=>{
    
  }).prefix('/products')

  Route.group(()=>{
    Route.post('', 'ProductCategoriesController.store')
    Route.get('', 'ProductCategoriesController.index')
    Route.get('search-by-name', 'ProductCategoriesController.searchByName')
    Route.get('active', 'ProductCategoriesController.active')
  }).prefix('/product-categories')

}).prefix('/api')

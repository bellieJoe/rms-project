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
import Drive from '@ioc:Adonis/Core/Drive'

Route.get('/', async () => {
  return "Hello World";
})

Route.group(()=>{

  Route.group(() => {
    Route.post('send-verification-email', 'UsersController.sendVerificationEmail');
    Route.post('verify-email', 'UsersController.verifyEmail');
    Route.get('', 'UsersController.index'); 
    Route.get('search-by-name', 'UsersController.searchByName'); 
    Route.get('register', 'UsersController.register'); 
    Route.post('signin', 'UsersController.signin'); 
    Route.post('signin-employee', 'UsersController.signinEmployee'); 
    Route.post('add-user', 'UsersController.addUser'); 
    Route.post('signup', 'UsersController.signup'); 
    Route.get('email-inused/:email', 'UsersController.emailInUsed'); 
    Route.get('test', 'UsersController.test'); 
    Route.put('edit-profile', 'UsersController.editProfile'); 
    Route.post('send-password-reset-link', 'UsersController.sendPasswordResetLink'); 
  }).prefix('/users')

  Route.group(()=>{
    Route.post('', 'ProductItemsController.store');
    Route.get('get-by-id', 'ProductItemsController.getById');
    Route.put('update', 'ProductItemsController.update');
    Route.get('active', 'ProductItemsController.active');
    Route.get('search-by-name', 'ProductItemsController.searchByName');
    Route.post('upload-image', 'ProductItemsController.uploadImage');
    Route.get('read-image', 'ProductItemsController.readImage');
    Route.put('toggle-in-menu', 'ProductItemsController.toggleInMenu');
    Route.put('archive', 'ProductItemsController.archive');
  }).prefix('/products')

  Route.group(()=>{
    Route.post('', 'ProductVariantsController.store');
    Route.put('update', 'ProductVariantsController.update');
    Route.put('toggle-in-menu', 'ProductVariantsController.toggleInMenu');
    Route.put('toggle-online', 'ProductVariantsController.toggleOnline');
    Route.get('get-variants-by-product-item-id', 'ProductVariantsController.getVariantsByProductItemId');
    Route.put('archive', 'ProductVariantsController.archive');
  }).prefix('/product-variants')

  Route.group(()=>{
    Route.post('', 'ProductCategoriesController.store')
    Route.put('update/:id', 'ProductCategoriesController.update')
    Route.get('', 'ProductCategoriesController.index')
    Route.get('search-by-name', 'ProductCategoriesController.searchByName')
    Route.put('archive', 'ProductCategoriesController.archive')
    Route.get('active', 'ProductCategoriesController.active')
  }).prefix('/product-categories')

  Route.group(()=>{
    Route.get('read-by-url',  async ({request})=>{
        const url = request.input('url')
        const contents = await Drive.get(url)
        return contents.toString()
    })
  }).prefix('/images')

  Route.group(()=>{
    Route.get('init', 'MenusController.init')
    Route.get('init-online', 'MenusController.initOnline')
    Route.post('place-order-pos', 'MenusController.placeOrderPOS')
    Route.post('place-order-online', 'MenusController.placeOrderOnline')
    Route.get('get-delivery-types', 'MenusController.getDeliveryTypes')
    Route.get('generate-recommendations', 'MenusController.generateRecommendations')
  }).prefix('/menu')

  Route.group(()=>{
    Route.get('', 'OrdersController.index')
    Route.get('customer-orders', 'OrdersController.customerOrders')
    Route.get('fetch-items', 'OrdersController.fetchItems')
    Route.post('pos-completed', 'OrdersController.posMarkAsCompleted')
    Route.post('customer-cancel', 'OrdersController.customerCancel')
    Route.put('store-cancel', 'OrdersController.storeCancel')
    Route.put('store-process', 'OrdersController.storeProcess')
    Route.put('mark-as-delivery', 'OrdersController.markAsDelivery')
    Route.put('mark-as-ready-for-delivery', 'OrdersController.markAsReadyForDelivery')
  }).prefix('/orders')

  Route.group(()=>{
    Route.post('store-supply-item', 'SupplyItemsController.store')
    Route.post('add-supply-stocks', 'SupplyItemsController.addSupplyStocks')
    Route.post('add-supply-trans', 'SupplyItemsController.addSupplyTrans')
    Route.put('edit-supply-item', 'SupplyItemsController.edit')
    Route.get('supply-items', 'SupplyItemsController.index')
    Route.get('supply-stocks-by-supply-item-id', 'SupplyItemsController.getSupplyStocksBySupplyItemId')
    Route.get('search-supply-items-by-name', 'SupplyItemsController.searchByName')
    Route.group(()=>{
      Route.post('', 'EquipmentItemsController.store')
      Route.get('', 'EquipmentItemsController.index')
      Route.get('stocks', 'EquipmentItemsController.stocks')
      Route.get('search-items-by-name', 'EquipmentItemsController.searchItemsByName')
      Route.put('edit-item', 'EquipmentItemsController.editItem')
      Route.post('add-stocks', 'EquipmentItemsController.addStocks')
      Route.put('change-stock-status', 'EquipmentItemsController.changeStockStatus')
    }).prefix('equipments')
  }).prefix('/inventory')

  Route.group(()=>{
    Route.get('', 'AppSettingsController.index')
    Route.post('', 'AppSettingsController.update')
  }).prefix('app-settings')

  Route.group(()=>{
    Route.post('', 'EmployeesController.store')
    Route.get('', 'EmployeesController.index')
    Route.get('test', 'EmployeesController.test')
    Route.post('end-employment', 'EmployeesController.endEmployment')
    Route.get('dashboard', 'EmployeesController.dashboard')
  }).prefix('employees')
  
  Route.group(()=>{
    Route.post('', 'DtrsController.store')
    Route.get('get-by-date', 'DtrsController.getByDate')
  }).prefix('dtrs')

  Route.group(()=>{
    Route.get('', 'PayrollsController.index')
    Route.get('get-list', 'PayrollsController.getList')
    Route.delete('delete-payroll-range', 'PayrollsController.deletePayrollRange')
    Route.post('generate-payroll', 'PayrollsController.generatePayroll')
    Route.get('test', 'PayrollsController.test')
  }).prefix('payrolls')

  Route.group(()=>{
    Route.get('monthly', 'SalesController.monthly')
  }).prefix('sales')



}).prefix('/api')

const express = require('express');
const MiddlewareAuthentication = require('../middleware/MiddlewareAuthentication')
// import Registration from './../../front-end/react-project/src/components/Registration';
const Routes = express.Router();
// const api =  require('../middleware/MiddlewareAthentication');
const UserController = require('../controllers/User_Controller');
// const UserLogIn = require('../controllers/LogIn_Controller');
const CategoryController = require('../controllers/Category_Controller');
// const ProductController = require('../controllers/Product_Controller');
const ProductController = require('../controllers/Product_Controller');

Routes.post('/Registration', UserController.Registration);

Routes.post('/LogIn', UserController.LogIn);

Routes.post('/AddCategory', MiddlewareAuthentication, CategoryController.createCategory);

Routes.get('/AllCategory', MiddlewareAuthentication, CategoryController.fetchAllCategory);

Routes.post('/CategoryByName', MiddlewareAuthentication, CategoryController.getCategoryByName);

Routes.put('/UpdateCategory', MiddlewareAuthentication, CategoryController.updateCategory);

Routes.post('/DeleteCategory', MiddlewareAuthentication, CategoryController.deleteCategory);

Routes.post('/AddProduct', MiddlewareAuthentication, ProductController.createProduct);

Routes.get('/AllProduct', MiddlewareAuthentication, ProductController.fetchAllProduct);

Routes.post('/ProductByName', MiddlewareAuthentication, ProductController.getProductByName);

Routes.put('/UpdateProduct', MiddlewareAuthentication, ProductController.updateProduct);

Routes.post('/DeleteProduct', MiddlewareAuthentication, ProductController.deleteProduct);

module.exports = {
    Routes
};
const express = require('express');
const MiddlewareAuthentication = require('../middleware/MiddlewareAuthentication')
// import Registration from './../../front-end/react-project/src/components/Registration';
const Routes = express.Router();
// const api =  require('../middleware/MiddlewareAthentication');
const UserController = require('../controllers/User_Controller');
// const UserLogIn = require('../controllers/LogIn_Controller');
const CategoryController = require('../controllers/Category_Controller');

Routes.post('/Registration', UserController.Registration);

Routes.post('/LogIn', UserController.LogIn);

Routes.post('/AddCategory', MiddlewareAuthentication, CategoryController.createCategory);

Routes.get('/AllCategory', MiddlewareAuthentication, CategoryController.fetchAllCategory);

Routes.post('/CategoryByName', MiddlewareAuthentication, CategoryController.getCategoryByName);

Routes.put('/UpdateCategory', MiddlewareAuthentication, CategoryController.updateCategory);


module.exports = {
    Routes
};
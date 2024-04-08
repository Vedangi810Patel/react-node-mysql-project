const express = require('express');

// import Registration from './../../front-end/react-project/src/components/Registration';
const Routes = express.Router();
// const api =  require('../middleware/MiddlewareAthentication');
const UserController = require('../controllers/User_Controller');
// const UserLogIn = require('../controllers/LogIn_Controller');
const BookController = require('../controllers/Book_Controller')

Routes.post('/Registration', UserController.Registration);

Routes.post('/LogIn', UserController.LogIn);

// Routes.get('/FetchBooks', BookController.fetchAllBooks);


module.exports = {
    Routes
};
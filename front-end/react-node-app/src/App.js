import './App.css';
import logo from './logo.svg';
import {ToastContainer} from 'react-toastify'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LogIn from './components/LogIn/LogIn';
import Registration from './components/Registration/Registration';
import CategoryCrud from './components/Category/Category';
import AddCategory from './components/AddCategory/AddCategory';
import ProductCrud from './components/Product/Product';
import AddProduct from './components/AddProduct/AddProduct';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header"> */}
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            {/* <Route path='/' element={<Home />} /> */}
            <Route path='/Registration' element={<Registration />}/>
            <Route path='/LogIn' element={<LogIn/>} />
            <Route path='/AllCategory' element={<CategoryCrud />} />
            <Route path='/AddCategory' element={<AddCategory />} />
            <Route path='/AllProduct' element={<ProductCrud />} />
            <Route paht='/AddProduct' element={<AddProduct />} />
          </Routes>
        </BrowserRouter>
      {/* </header> */}
    </div>
  );
}

export default App;

import './App.css';
import logo from './logo.svg';
import {ToastContainer} from 'react-toastify'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
        <Router>
          <Routes>
            {/* <Route path='/' element={<Home />} /> */}
            <Route path='/Registration' element={<Registration />}/>
            <Route path='/' element={<LogIn/>} />
            <Route path='/AllCategory' element={<CategoryCrud />} />
            <Route path='/AddCategory' element={<AddCategory />} />
            <Route path='/AllProduct' element={<ProductCrud />} />
            <Route path='/AddProduct' element={<AddProduct />} />
          </Routes>
        </Router>
      {/* </header> */}
    </div>
  );
}

export default App;

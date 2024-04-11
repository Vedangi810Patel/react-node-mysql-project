import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Registration from './components/Registration/Registration';
import LogIn from './components/LogIn/LogIn';
import CategoryCrud from './components/Category/Category';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header"> */}
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/Registration' element={<Registration />}/>
            <Route path='/LogIn' element={<LogIn/>} />
            <Route path='/AllCategory' element={<CategoryCrud />} />
          </Routes>
        </BrowserRouter>
      {/* </header> */}
    </div>
  );
}

export default App;

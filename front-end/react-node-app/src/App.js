import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Registration from './Components/Registration/Registration';
import LogIn from './Components/LogIn/LogIn';
import CategoryCrud from './Components/Category/Category';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/Registration' element={<Registration />}/>
            <Route path='/LogIn' element={<LogIn/>} />
            <Route path='/AllCategory' element={<CategoryCrud />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;

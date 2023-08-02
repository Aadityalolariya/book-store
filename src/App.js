import BookCard from './components/BookCard/BookCard';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
function App() {
  return (
    <>
      {/* <BookCard title = 'Quantum Mechanics' author = "Author Name" price = "300" discount='20% OFF'/> */}
      {/* <div>App</div> */}
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Layout/>}>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;

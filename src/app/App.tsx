import Main from './pages/Main/Main';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Details from './pages/Details/Details';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />}>
          <Route path='details' element={<Details />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import Main from './pages/Main/Main';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Details from './pages/Details/Details';
import NotFound from './pages/NotFound/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />}>
          <Route path='details' element={<Details />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

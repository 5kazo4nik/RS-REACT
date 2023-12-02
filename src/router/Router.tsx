import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import ControlledForm from '../pages/FormsPages/ControlledPage';
import UncontrolledPage from '../pages/FormsPages/UncontrolledPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='controlled' element={<ControlledForm />} />
        <Route path='uncontrolled' element={<UncontrolledPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

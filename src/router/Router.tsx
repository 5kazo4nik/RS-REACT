import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import ControlledForm from '../pages/ControlledForm/ControlledForm';
import UncontrolledForm from '../pages/UncontrolledForm/UncontrolledForm';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="controlled" element={<ControlledForm />} />
        <Route path="uncontrolled" element={<UncontrolledForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

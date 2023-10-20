import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from '../pages/Main/Main';
import Details from '../pages/Details/Details';
import NotFound from '../pages/NotFound/NotFound';

const CommonRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Main />}>
          <Route path='details' element={<Details />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
};

export default CommonRoutes;

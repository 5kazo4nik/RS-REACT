import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import CommonRoutes from './CommonRoutes';

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <CommonRoutes />
      </BrowserRouter>
    </>
  );
};

export default Router;

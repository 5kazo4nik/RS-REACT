import { BrowserRouter } from 'react-router-dom';
import './App.css';
import CommonRoutes from './components/Router/CommonRoutes';

function App() {
  return (
    <BrowserRouter>
      <CommonRoutes />
    </BrowserRouter>
  );
}

export default App;

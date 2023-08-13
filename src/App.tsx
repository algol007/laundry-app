import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './modules/Home';
import { NotFoundPage } from './modules/NotFound';
import {
  AddNewProductPage,
  ProductDetailPage,
  ProductListPage,
} from './modules/Products';
import { SettingPage } from './modules/Settings';
import { SalesPage } from './modules/Sales';
import { LoginPage } from './modules/Auth';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/product' element={<ProductListPage />} />
        <Route path='/product/:id' element={<ProductDetailPage />} />
        <Route path='/create-product' element={<AddNewProductPage />} />
        <Route path='/sales' element={<SalesPage />} />
        <Route path='/setting' element={<SettingPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

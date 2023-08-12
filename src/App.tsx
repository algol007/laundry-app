import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './modules/Home';
import { NotFoundPage } from './modules/NotFound';
// import { DetailPage } from './modules/Detail';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='*' element={<NotFoundPage />} />
        {/* <Route path='/level/:id' element={<DetailPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;

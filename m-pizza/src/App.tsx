import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MainLayout from './layouts/MainLayout';
import './scss/app.scss';
import Loadable from 'react-loadable';

const Cart = Loadable({
  loader: () => import(/* webpackChunkName: "Cart" */ './pages/Cart'),
  loading: () => <div>Loading...</div>,
});

const FullPizza = Loadable({
  loader: () => import(/* webpackChunkName: "FullPizza" */ './pages/FullPizza'),
  loading: () => <div>Loading...</div>,
});

const NotFound = Loadable({
  loader: () => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'),
  loading: () => <div>Loading...</div>,
});

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/card" element={<Cart />} />
        <Route path="/pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;

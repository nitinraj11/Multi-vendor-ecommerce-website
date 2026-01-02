import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminDashboard from './Pages/AdminDashboard';
import HomePage from './Pages/HomePage';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Checkout from './Pages/Checkout';
import PaymentGateway from './Pages/PaymentGateway';
import OrderSuccess from './Pages/OrderSuccess';
import ForgotPassword from './Pages/ForgotPassword';
import ProductDetail from './components/Products/ProductDetail';
import ListingDetail from "./components/Listings/ListingDetail";
import Shop from './Pages/Shop';

const App = () => {
  return (
    <>
      {/* <h1>Hello from App.jsx</h1> */}

      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/" element={<HomePage />}>{/* HomePage */}</Route>
          <Route path="/login" element={<Login />}>{/* LoginPage */}</Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<PaymentGateway />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/listing/:id" element={<ListingDetail />} />
          <Route path="shop" element={<Shop />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

// const App = () => {
//   return (
//     <>
//       {/* <h1>Hello from App.jsx</h1> */}

//       <BrowserRouter>
//         <Routes>
//           <Route path="/admin/users" element={<AdminDashboard />} />
        
//         </Routes>
//       </BrowserRouter>
//     </>
//   );
// };


export default App;



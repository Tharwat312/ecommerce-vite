import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import TokenContextProvider from './Context/Token';
import CartContextProvider from './Context/Cart';
import WishlistContextProvider from './Context/Wishlist';
const root = ReactDOM.createRoot(document.getElementById('root'));
let queryClient = new QueryClient();
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TokenContextProvider>
        <CartContextProvider>
          <WishlistContextProvider>
            <App />
          </WishlistContextProvider>
        </CartContextProvider>
      </TokenContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

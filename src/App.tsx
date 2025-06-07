import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext'; // Add this import
import { CartDrawer } from './components/CartModal/Cart'; // Add this import
// ...other imports...

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          {/* Your existing routes and components */}
          <Routes>
            {/* ...your existing routes... */}
          </Routes>
          
          {/* Add the CartDrawer component */}
          <CartDrawer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
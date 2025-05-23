import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ElementDefault } from "./screens/ElementDefault/ElementDefault"; 
import { ProductGridSection } from "./screens/ElementDefault/sections/ProductListing";
import { ProductsPage } from "./screens/ElementDefault/sections/ProductPage";
// Adjust the import path as needed
// Placeholder for your second page


const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<ElementDefault />} />
        <Route path="/products" element={<ProductGridSection />} />
        <Route path= '/productpage' element={<ProductsPage />} />

      </Routes>
    </BrowserRouter>
  );
};
export default AppRoutes;

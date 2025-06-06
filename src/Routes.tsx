import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ElementDefault } from "./screens/ElementDefault/MainLanding"; 
import { ProductGridSection } from "./screens/ElementDefault/sections/ProductListing";
import { ProductsPage } from "./screens/ElementDefault/sections/ProductPage";

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ElementDefault />} />
        <Route path="/products" element={<ProductGridSection />} />
        <Route path="/product-category/:slug" element={<ProductGridSection />} />
        <Route path="/product/:id" element={<ProductsPage />} />
        <Route path="/productpage" element={<ProductsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

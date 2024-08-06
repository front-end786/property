import CalculatorListPage from "@/app/admin/calculator/page";
import AdminPage from "@/app/admin/page";
import UserRegister from "@/app/admin/users/page";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function NavigationBar() {
  return (
    <nav>
      <BrowserRouter>
        <Routes>
          <Route path="admin" element={<AdminPage />} />
          <Route path="admin/users" element={<UserRegister />} />
          <Route path="admin/calculator" element={<CalculatorListPage />} />
        </Routes>
      </BrowserRouter>
    </nav>
  );
}

export default NavigationBar;
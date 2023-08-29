import { Routes, Route } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import { Home } from "../pages/Home"
import { DishDetail } from "../pages/DishDetail";
import { AddDish } from "../pages/AddDish";
import { EditDish } from "../pages/EditDish";

export function AppRoutes() {
  const { user } = useAuth();
  const isAdmin = user && user.admin === 1;

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/details/:id" element={<DishDetail />} />
      {isAdmin && <Route path="/add" element={<AddDish />} />}
      {isAdmin && <Route path="/edit/:id" element={<EditDish />} />}
    </Routes>
  )
}
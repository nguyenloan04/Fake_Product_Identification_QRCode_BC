import React from "react";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <nav className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Admin</h2>

      <NavLink
        to="/admin/dashboard"
        className={({ isActive }) =>
          `block px-3 py-2 rounded hover:bg-white/10 ${
            isActive ? "bg-white/20 font-semibold" : ""
          }`
        }
      >
        Quản lý sản phẩm
      </NavLink>

      {/* Thêm menu khác nếu cần */}
    </nav>
  );
};

export default AdminSidebar;

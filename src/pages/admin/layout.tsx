import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "@/components/AdminSidebar";
import Header from "@/components/Header";

const AdminLayout = () => {
  return (
    <main className="relative h-screen w-screen bg-gray-50">
      {/* Layout chia cột: Sidebar + Nội dung */}
      <div className="flex h-full">
        {/* Sidebar */}
        <aside className="w-64 bg-[#2D5F4D] text-white p-4 shadow-md">
          <AdminSidebar />
        </aside>

        {/* Nội dung chính */}
        <div className="flex-1 flex flex-col">
          <Header />

          <section className="flex-1 overflow-y-auto bg-white p-6">
            <Outlet />
          </section>
        </div>
      </div>
    </main>
  );
};

export default AdminLayout;

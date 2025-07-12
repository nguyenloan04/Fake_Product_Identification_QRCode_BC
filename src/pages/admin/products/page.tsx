import React from "react";
import AddProductForm from "@/components/AddProduct";

const AddProductPage = () => {
  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-2xl font-bold text-green-700 mb-6">Thêm sản phẩm</h1>
      <AddProductForm />
    </div>
  );
};

export default AddProductPage;

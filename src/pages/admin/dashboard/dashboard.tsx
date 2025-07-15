import React, { useEffect, useState } from "react";
import { getAllProducts } from "@/services/product.service";
import { ProductCardType } from "@/types/product.type";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import ProductCard from "@/components/ProductCard";

const Dashboard = () => {
  const [products, setProducts] = useState<ProductCardType[]>([]);

  const fetchProducts = async () => {
    try {
      const result = await getAllProducts();
      setProducts(result);
    } catch (err) {
      console.error("Lỗi khi tải sản phẩm:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const navigate = useNavigate();
  const handleEdit = (id: number) => {
    navigate(`/admin/product/edit/${id}`);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Quản lý sản phẩm</h1>

      <div className="space-y-2">
        <Button
          className="bg-green-700 hover:bg-green-600 text-white"
          onClick={() => navigate("/admin/add-product")}
        >
          Thêm sản phẩm
        </Button>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Danh sách sản phẩm</h2>
        <div className="space-y-4">
          {products.map((p) => (
            <div
              key={p.id}
              className="flex justify-between items-center border rounded-lg p-4 shadow bg-white"
            >
              <div className="flex-1">
                <ProductCard product={p} />
              </div>

              <div className="flex flex-col gap-2 ml-4">
                <button
                  onClick={() => handleEdit(p.id)}
                  className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Sửa
                </button>
                <button
                  // onClick={() => handleDelete(p.id)}
                  className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Xoá
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

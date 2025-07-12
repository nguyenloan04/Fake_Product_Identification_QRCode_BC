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
        <ul className="divide-y border rounded">
          {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;

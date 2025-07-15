import React, { useEffect, useState } from "react";
import EditProductForm from "@/components/EditProduct";
import { useParams } from "react-router";
import { ProductType } from "@/types/product.type";
import { getProductById } from "@/services/product.service";

const EditProductPage= () =>{
  const { id } = useParams(); // Lấy productId từ URL
  const [product, setProduct] = useState<ProductType | null>(null);

  useEffect(() => {
    if (id) {
      getProductById(Number(id))
        .then(setProduct)
        .catch((err) => console.error("Lỗi tải sản phẩm:", err));
    }
  }, [id]);

  if (!product) return <p>Đang tải sản phẩm...</p>;
  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-2xl font-bold text-green-700 mb-6">Cập nhật sản phẩm</h1>
      {product && <EditProductForm product={product} />}
    </div>
);
};
export default EditProductPage;
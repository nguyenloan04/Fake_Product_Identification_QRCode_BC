import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Product from "@/components/Products";
import ProductCardDetail from "@/components/ProductCardDetail";
import { getProductById } from "@/services/product.service";
import { ProductType } from "@/types/product.type";

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<ProductType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            const productId = parseInt(id);
            getProductById(productId)
              .then((data) => {
                  setProduct(data);
                  setError(null);
              })
              .catch((err) => {
                  setError("Không tìm thấy sản phẩm hoặc lỗi kết nối.");
                  console.error(err);
              })
              .finally(() => setLoading(false));

            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [id]);

    return (
      <>
          <Header />

          <main className="container mt-10 min-h-[60vh]">
              {loading && <p className="text-center">Đang tải sản phẩm...</p>}

              {!loading && error && (
                <p className="text-center text-red-500">{error}</p>
              )}

              {!loading && product && (
                <ProductCardDetail product={product} />
              )}

          </main>

          <div className="mt-14">
              <Product title="Sản phẩm liên quan" />
          </div>

          <Footer />
      </>
    );
};

export default ProductDetail;

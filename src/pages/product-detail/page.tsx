import Footer from "@/components/Footer.tsx";
import Header from "@/components/Header.tsx";
import ProductCardDetail from "@/components/ProductCardDetail.tsx";
import Product from "@/components/Products.tsx";
import productService from "@/services/product.service";
import { ProductType } from "@/types/product.type.ts";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] =
    useState<ProductType | null>(null);

  useEffect(() => {
    if (id) {
      productService
        .getProductById(id)
        .then((data) => setProduct(data))
        .catch((e) => console.log(e));
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [id]);

  return (
    <>
      <Header />
      <ProductCardDetail {...product} />
      <span className="mt-14 block"></span>
      <Product title="I may also like" />
      <span className="mt-14 block"></span>
      <Footer />
    </>
  );
};
export default ProductDetail;

import ProductCard from "@/components/ProductCard";
import { getProductRandom } from "@/services/product.service";
import { ProductCardType } from "@/types/product.type";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";

const Product = ({
  title,
}: {
  title: string;
}) => {
  const [products, setProducts] = useState<
    ProductCardType[]
  >([]);
  useEffect(() => {
    getProductRandom(4).then((res) => {
      setProducts(res);
    });
  }, []);
  return (
    <section className="container">
      <div className="flex items-center justify-between">
        <h2 className="text-4xl font-semibold">
          {title}
        </h2>
        <span className="text-md flex items-center gap-4 font-semibold text-[#00B207] outline-none">
          View All
          <Icon
            icon="solar:arrow-right-linear"
            width="15"
            height="15"
          />
        </span>
      </div>
      <div className="mt-16 grid grid-cols-4 gap-x-6">
        {products &&
          products.map((item) => (
            <ProductCard
              id={item.id}
              key={item.id}
              name={item.name}
              price={item.price}
              image={
                "/images/products/" + item.image
              }
            />
          ))}
      </div>
    </section>
  );
};

export default Product;

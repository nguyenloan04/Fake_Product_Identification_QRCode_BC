import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/pages/manager/product/columns";
import productService from "@/services/product.service";
import { ProductType } from "@/types/product.type";
import React, {
  useEffect,
  useState,
} from "react";

const ManagerProductPage = () => {
  const [data, setData] = useState<
    ProductType[] | []
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products =
          await productService.getAll();
        setData(products);
      } catch (error) {
        console.error(
          "Error fetching products:",
          error,
        );
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default ManagerProductPage;

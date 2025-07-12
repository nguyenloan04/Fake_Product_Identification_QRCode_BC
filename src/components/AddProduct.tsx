"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createProduct, getProductCount } from "@/services/product.service";
import { uploadToCloudinary } from "@/services/cloudinary.service";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

type AddProductFormData = {
  title: string;
  category: string;
  productCode: string;
  price: number;
  unitShipped: number;
  unitSold: number;
  unitOnHand: number;
  supplier: string;
  farmLocation: string;
  saleDate: string; // yyyy-mm-dd
};

const AddProductForm = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<AddProductFormData>({
    defaultValues: {
      title: "",
      category: "",
      productCode: "",
      price: 0,
      unitShipped: 0,
      unitSold: 0,
      unitOnHand: 0,
      supplier: "",
      farmLocation: "",
      saleDate: ""
    }
  });

  const onSubmit = async (data: AddProductFormData) => {
    try {
      if (!file || !data.title) {
        toast.error("Vui lòng chọn ảnh và nhập tên sản phẩm");
        return;
      }

      const count = await getProductCount(); // dùng làm productId
      const imageUrl = await uploadToCloudinary(file, data.title, count);
      const saleDate = new Date(data.saleDate); // yyyy-mm-dd

      await createProduct({
        title: data.title,
        category: data.category,
        image: imageUrl,
        productCode: data.productCode,
        price: data.price,
        unitShipped: data.unitShipped,
        unitSold: data.unitSold,
        unitOnHand: data.unitOnHand,
        supplier: data.supplier,
        farmLocation: data.farmLocation,
        saleDate
      });

      toast.success("Thêm sản phẩm thành công!");
      reset(); // reset form
      setFile(null); // reset file
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Add Product Error:", error);
      toast.error("Thêm sản phẩm thất bại!");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4 p-4 bg-white rounded shadow">
      <Input {...register("title")} placeholder="Tên sản phẩm" required />
      <Input {...register("category")} placeholder="Danh mục" required />
      <Input {...register("productCode")} placeholder="Mã sản phẩm (hash)" required />
      <Input type="number" {...register("price", { valueAsNumber: true })} placeholder="Giá / kg" required />
      <Input type="number" {...register("unitShipped", { valueAsNumber: true })} placeholder="Số kg đã giao" required />
      <Input type="number" {...register("unitSold", { valueAsNumber: true })} placeholder="Số kg đã bán" required />
      <Input type="number" {...register("unitOnHand", { valueAsNumber: true })} placeholder="Tồn kho (kg)" required />
      <Input {...register("supplier")} placeholder="Nhà cung cấp" required />
      <Input {...register("farmLocation")} placeholder="Nơi trồng" required />
      <Input type="date" {...register("saleDate")} required />
      <Input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="col-span-2"
      />
      <div className="col-span-2">
        <Button type="submit" className="w-full bg-green-700 hover:bg-green-600 text-white">
          Thêm sản phẩm
        </Button>
      </div>
    </form>
  );
};

export default AddProductForm;

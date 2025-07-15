"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ProductType } from "@/types/product.type";
import { updateProduct } from "@/services/product.service";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

type Props = {
  product: ProductType;
};

const EditProductForm: React.FC<Props> = ({ product }) => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<ProductType>();

  // 👉 Khi component mount, fetch địa chỉ mới và gọi reset
  useEffect(() => {
    const fetchAddress = async () => {
      // Nếu userId đã là địa chỉ ví rồi thì bỏ qua
      reset({
        ...product,
        saleDate: new Date(product.saleDate).toISOString().split("T")[0],
        owner: product.owner,
      });


      try {
        reset({
          ...product,
          saleDate: new Date(product.saleDate).toISOString().split("T")[0],
          owner: product.owner,
        });
      } catch (e) {
        console.error("Không tìm được địa chỉ ví:", e);
      }
    };

    fetchAddress();
  }, [product, reset]);


  const onSubmit = async (data: ProductType) => {
    try {
      console.log("DATA SUBMIT:", data);
      const saleDate = new Date(data.saleDate);

      if (!saleDate || isNaN(saleDate.getTime())) {
        toast.error("Ngày bán không hợp lệ");
        return;
      }

      await updateProduct({
        ...product,
        ...data,
        saleDate,
        owner: data.owner,
      });

      toast.success("Cập nhật thành công");
      navigate("/admin/dashboard");
    } catch (e) {
      console.error("Lỗi cập nhật:", e);
      toast.error("Cập nhật thất bại");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4 p-4 bg-white rounded shadow">
      <Input {...register("title")} placeholder="Tên sản phẩm" />
      <Input {...register("category")} placeholder="Danh mục" />
      <Input {...register("productCode")} placeholder="Mã sản phẩm" />
      <Input type="number" step="0.01" {...register("price")} placeholder="Giá /kg" />
      <Input type="number" {...register("unitShipped")} placeholder="Số kg đã giao" />
      <Input type="number" {...register("unitSold")} placeholder="Số kg đã bán" />
      <Input type="number" {...register("unitOnHand")} placeholder="Tồn kho (kg)" />
      <Input {...register("supplier")} placeholder="Nhà cung cấp" />
      <Input {...register("farmLocation")} placeholder="Nơi trồng" />
      <Input type="date" {...register("saleDate")} />
      <Input {...register("owner")} placeholder="Username người sở hữu mới" />
      <div className="col-span-2">
        <Button type="submit" className="w-full bg-blue-600 text-white">
          Cập nhật
        </Button>
      </div>
    </form>
  );
};

export default EditProductForm;

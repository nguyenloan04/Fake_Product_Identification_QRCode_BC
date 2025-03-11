import React, {
  useEffect,
  useState,
} from "react";
import { Row } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import DialogUpdate from "@/pages/manager/product/dialog-update";
import { ProductType } from "@/types/product.type";
import productService from "@/services/product.service";
import { toast } from "sonner";

interface DataTableRowActionsProps<
  TData,
  K extends keyof TData,
> {
  row: Row<TData>;
  id: K;
}

function DataTableRowActions<
  TData,
  K extends keyof TData,
>({
  row,
  id,
}: DataTableRowActionsProps<TData, K>) {
  const [isEditOpen, setIsEditOpen] =
    useState(false);
  const [product, setProduct] =
    useState<ProductType>();
  useEffect(() => {
    productService
      .getProductById(row.id)
      .then((product) => setProduct(product))
      .catch(() =>
        toast.error("Khong tim thay san pham"),
      );
  }, []);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0"
          >
            <span className="sr-only">
              Open menu
            </span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            Actions
          </DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() =>
              navigator.clipboard.writeText(
                id.toString() || "",
              )
            }
          >
            Copy id
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setIsEditOpen(true)}
          >
            Chỉnh sửa thông tin sản phẩm
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {product && (
        <DialogUpdate
          product={product}
          open={isEditOpen}
          setOpen={(status) =>
            setIsEditOpen(status)
          }
        />
      )}
    </>
  );
}

export default DataTableRowActions;

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProductType } from "@/types/product.type";

type DialogUpdateProps = {
  product: ProductType;
  open?: boolean;
  setOpen: (status: boolean) => void;
};

const DialogUpdate = ({
  open = true,
  setOpen,
  product: { id, image },
}: DialogUpdateProps) => {
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
      }}
      defaultOpen={false}
    >
      <DialogContent className="min-w-3/4">
        <DialogHeader>
          <DialogTitle>
            Cập nhập thông tin sản phẩm
          </DialogTitle>
          <DialogDescription>
            Cập nhập thông tin sản phẩm
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <img
              src={"/public/images/" + image}
              alt=""
              className="h-96 w-auto object-contain"
            />
            <Label
              htmlFor="name"
              className="text-right"
            >
              Name
            </Label>
            <Input
              id="name"
              value="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="username"
              className="text-right"
            >
              Username
            </Label>
            <Input
              id="username"
              value="@peduarte"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Lưu</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default DialogUpdate;

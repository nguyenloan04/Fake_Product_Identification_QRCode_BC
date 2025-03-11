import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type DialogUpdateProps = {
  open?: boolean;
  setOpen: (status: boolean) => void;
};

const DialogUpdate = ({
  open = true,
  setOpen,
}: DialogUpdateProps) => {
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
      }}
      defaultOpen={false}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Cập nhập thông tin khách hàng
          </DialogTitle>
          <DialogDescription>
            Cập nhập thông tin khách hàng
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
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

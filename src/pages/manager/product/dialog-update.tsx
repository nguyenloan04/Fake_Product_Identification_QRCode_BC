import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import QRCode from "react-qr-code";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProductType } from "@/types/product.type";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { UpdatedBodyReqType } from "@/types/schema/product.schema";

type DialogUpdateProps = {
  product: ProductType;
  open?: boolean;
  setOpen: (status: boolean) => void;
};

const DialogUpdate = ({
  open = true,
  setOpen,
  product: {
    id,
    image,
    name,
    category,
    price,
    unitOnHand,
    unitShipped,
  },
}: DialogUpdateProps) => {
  // 1. Define your form.
  const form = useForm<UpdatedBodyReqType>({
    defaultValues: {
      name,
      category,
      price,
      unitOnHand,
      unitShipped,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: any) {}

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
        <div className="grid grid-flow-col grid-cols-3 gap-4">
          <div className="relative col-span-1 overflow-hidden rounded-2xl">
            <img
              src={"/images/products/" + image}
              alt=""
              className="col-span-3 h-96 object-fill object-top"
            />
            <QRCode
              className="absolute top-1 left-1 size-8"
              size={256}
              value={"123"}
              viewBox={`0 0 256 256`}
            />
          </div>

          <div className="col-span-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(
                  onSubmit,
                )}
                className="space-y-3"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Vui lòng không để trống"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-4">
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Price
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Vui lòng không để trống"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Category
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Vui lòng không để trống"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="unitShipped"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Unit Shipped
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Vui lòng không để trống"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="unitOnHand"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Unit On Hand
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Vui lòng không để trống"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </form>
            </Form>
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

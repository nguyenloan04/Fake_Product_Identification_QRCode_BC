import React, { useState } from "react";
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
import DialogUpdate from "@/pages/manager/user/dialog-update";

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
            Copy user email
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setIsEditOpen(true)}
          >
            Chỉnh sửa thông tin user
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogUpdate
        open={isEditOpen}
        setOpen={(status) =>
          setIsEditOpen(status)
        }
      />
    </>
  );
}

export default DataTableRowActions;

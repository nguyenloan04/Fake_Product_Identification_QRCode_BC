import { ColumnDef } from "@tanstack/react-table";
import DataTableRowActions from "@/pages/manager/product/data-table-row-actions";
import { ProductType } from "@/types/product.type";

export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "id",
    header: "id",
    cell: ({ row }) => (
      <div className="border-r">
        {row.getValue("id")}
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="border-r p-2">
        {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: "price",
  },
  {
    accessorKey: "category",
    header: "category",
  },
  {
    accessorKey: "Action",
    cell: ({ row }) => {
      return (
        <DataTableRowActions row={row} id="id" />
      );
    },
  },
];

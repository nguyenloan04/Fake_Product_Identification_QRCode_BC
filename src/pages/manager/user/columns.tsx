import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/types/user.type.ts";
import { Button } from "@/components/ui/button";
import DataTableRowActions from "@/pages/manager/user/data-table-row-actions";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="border-r">
        {row.getValue("email")}
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
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "Action",
    cell: ({ row }) => {
      return (
        <DataTableRowActions
          row={row}
          id="email"
        />
      );
    },
  },
];

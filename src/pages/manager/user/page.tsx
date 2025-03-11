import { DataTable } from "../../../components/ui/data-table";
import { useEffect, useState } from "react";
import userService from "@/services/user.service.ts";
import { UserType } from "@/types/user.type.ts";
import { columns } from "@/pages/manager/user/columns";

export default function ManagerUserPage() {
  const [data, setData] = useState<
    UserType[] | []
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await userService.getAll(); // Ensure this returns User[]
        setData(users);
      } catch (error) {
        console.error(
          "Error fetching users:",
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
}

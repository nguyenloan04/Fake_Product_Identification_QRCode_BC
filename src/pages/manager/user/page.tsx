import {columns} from "./columns"
import {DataTable} from "./data-table"
import {useEffect, useState} from "react";
import userService from "@/services/user.service.ts";
import {User} from "@/types/user.type.ts";


export default function ManagerUserPage() {
    const [data, setData] = useState<User[] | []>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const users = await userService.getAll(); // Ensure this returns User[]
                setData(users);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchData()
    }, [])

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} on/>
        </div>
    )
}

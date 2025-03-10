import {userDataPromise} from "@/services/data.service.ts";
import {User} from "@/types/user.type.ts";

const userService = {
    getAll: async (): Promise<User[]> => {
        const response = await userDataPromise;
        if (!response) {
            throw new Error("404");
        }
        const result: User[] = [];
        Object.entries(response).forEach(([key, value]) => {
            result.push({
                email: key,
                name: value.name,
                password: value.password,
                role: value.role,
            })
        });

        return result;
    },

    getByEmail: async (email: string): Promise<User> => {
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await userDataPromise;
            const user = response[email];
            if (!user) {
                throw new Error("404");
            }
            return {
                ...user,
            };
        } catch (e) {
            throw e;
        }
    }
}

export default userService;
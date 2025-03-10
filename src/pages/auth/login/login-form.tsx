import {Button} from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";

import {
    LoginBodyReq,
    LoginBodyReqType,
} from "@/types/schema/auth.schema";
import {zodResolver} from "@hookform/resolvers/zod";

import {useForm} from "react-hook-form";
import userService from "@/services/user.service.ts";
import {useAppContext} from "@/AppContext.tsx";
import {toast} from "sonner"
import {useNavigate} from "react-router";

const LoginForm = () => {
    const {setUser} = useAppContext();
    const nav = useNavigate();

    // 1. Define your form.
    const form = useForm<LoginBodyReqType>({
        resolver: zodResolver(LoginBodyReq),
    });

    // 2. Define a submit handler.
    async function onSubmit(
        values: LoginBodyReqType,
    ) {
        const user = await userService.getByEmail(values.email)

        if (user) {
            if (user.password === values.password) {
                setUser(user);
                toast.success("Login thanh cong")
                nav("/admin")
            } else {
                toast.error("Sai mat khau")
            }
            return;
        }
        toast.error("Login that bai")
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3"
            >
                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Vui lòng không để trống"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Mật khẩu</FormLabel>
                            <FormControl>
                                <Input
                                    type={"password"}
                                    placeholder="Vui lòng không để trống"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button className="w-full" type="submit">
                    Đăng nhập
                </Button>
            </form>
        </Form>
    );
};

export default LoginForm;

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  LoginBodyReq,
  LoginBodyReqType,
} from "@/types/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExternalProvider } from "@ethersproject/providers";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginUser } from "@/services/user.service";

const LoginForm = () => {
  const form = useForm<LoginBodyReqType>({
    resolver: zodResolver(LoginBodyReq),
  });

  const navigate = useNavigate();

  async function onSubmit(values: LoginBodyReqType) {
    try {
      if (!window.ethereum) {
        alert("Vui lòng cài MetaMask");
        return;
      }

      const ethereum = window.ethereum as ExternalProvider;
      await ethereum.request?.({ method: "eth_requestAccounts" });

      const result = await loginUser(values.username, values.password);
      if (!result.success) {
        alert("Sai thông tin đăng nhập hoặc ví không đúng");
        return;
      }

      if (result.role === 1) navigate("/admin/dashboard");
      else navigate("/");
    } catch (error) {
      console.error(error);
      alert("Đăng nhập thất bại");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên đăng nhập</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nhập tên đăng nhập"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mật khẩu</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Nhập mật khẩu"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" type="submit">
          Đăng nhập với ví MetaMask
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;

"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  RegisterBodyReq,
  RegisterBodyReqType
} from "@/types/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExternalProvider } from "@ethersproject/providers";
import { useForm } from "react-hook-form";
import { registerUser } from "@/services/user.service";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const form = useForm<RegisterBodyReqType>({
    resolver: zodResolver(RegisterBodyReq)
  });

  const navigate = useNavigate();

  async function onSubmit(values: RegisterBodyReqType) {
    try {
      if (!window.ethereum) {
        alert("Vui lòng cài đặt MetaMask");
        return;
      }

      const ethereum = window.ethereum as ExternalProvider;
      await ethereum.request?.({ method: "eth_requestAccounts" });

      await registerUser(
        values.username,
        values.password,
        values.name,
        values.authorizeId,
        values.birthday,
        values.email,
        Number(values.role)
      );

      alert("Đăng ký thành công!");
      navigate("/auth/login");
    } catch (err: any) {
      console.error(err);
      alert("Đăng ký thất bại: " + (err.message || "Lỗi không xác định"));
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên đăng nhập</FormLabel>
              <FormControl>
                <Input placeholder="Nhập tên đăng nhập" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Họ và tên</FormLabel>
              <FormControl>
                <Input placeholder="Nhập họ và tên" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="authorizeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CCCD / CMND</FormLabel>
              <FormControl>
                <Input placeholder="Nhập CCCD/CMND" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="birthday"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ngày sinh</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="email@example.com" {...field} />
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
                <Input type="password" placeholder="Nhập mật khẩu" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nhập lại mật khẩu</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Xác nhận mật khẩu" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vai trò</FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="border rounded px-2 py-2 w-full"
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(e.target.value)}
                >
                  <option value="0">Người dùng</option>
                  <option value="1">Quản trị viên</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" type="submit">
          Đăng ký
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;

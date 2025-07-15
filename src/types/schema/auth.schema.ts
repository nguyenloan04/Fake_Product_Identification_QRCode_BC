import z from "zod";

export const LoginBodyReq = z.object({
  username: z.string().min(1, "Không được để trống"),
  password: z.string(),
});

export type LoginBodyReqType = z.infer<
  typeof LoginBodyReq
>;

const passwordSchema = z
  .string()
  .min(
    8,
    "Password must be at least 8 characters",
  )
  .regex(
    /[A-Z]/,
    "Must contain at least one uppercase letter",
  )
  .regex(
    /[a-z]/,
    "Must contain at least one lowercase letter",
  )
  .regex(
    /[0-9]/,
    "Must contain at least one number",
  )
  .regex(
    /[^A-Za-z0-9]/,
    "Must contain at least one special character",
  );

export const RegisterBodyReq = z
  .object({
    username: z.string().min(1, "Không được để trống"),
    name: z.string().min(8),
    password: passwordSchema,
    authorizeId: z.string().min(12, "CCCD/CMND không được để trống"),
    birthday: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Định dạng ngày sinh: YYYY-MM-DD"),
    email: z.string().email("Email không hợp lệ"),
    role: z.enum(["0", "1"], {
      errorMap: () => ({ message: "Chọn vai trò hợp lệ" }),
    }),
    "confirmPassword": z.string(),
  })
  .refine(
    (data) =>
      data.password === data["confirmPassword"],
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    },
  );

export type RegisterBodyReqType = z.infer<
  typeof RegisterBodyReq
>;

export type RegisterRes = {
  id: string;
  email: string;
  name: string;
  password: string;
};

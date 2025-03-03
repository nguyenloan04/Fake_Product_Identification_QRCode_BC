import z from "zod";

export const LoginBodyReq = z.object({
  email: z.string().email({
    message:
      "Please enter a valid email address.",
  }),
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
    email: z.string().email({
      message:
        "Please enter a valid email address.",
    }),
    name: z.string().min(8),
    password: passwordSchema,
    "confirm-password": z.string(),
  })
  .refine(
    (data) =>
      data.password === data["confirm-password"],
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

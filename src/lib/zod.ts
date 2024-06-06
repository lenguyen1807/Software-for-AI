import { z } from "zod"

export const LoginSchema = z.object({
  username: z
    .string()
    .min(4, { message: "Tên đăng nhập phải có ít nhất 4 ký tự" }),
  password: z
    .string()
})

export const SignUpSchema = z.object({
  username: z
    .string({required_error: "Tên đăng nhập là bắt buộc"})
    .min(4, { message: "Tên đăng nhập phải có ít nhất 4 ký tự" }),
  password: z
    .string({ required_error: "Mật khẩu là bắt buộc" })
    .min(8, { message: "Mật khẩu phải có ít nhất 8 ký tự" }),
  confirmPassword: z
    .string({ required_error: "Nhập lại mật khẩu là bắt buộc" }),
  name: z
    .string({ required_error: "Tên là bắt buộc"})
    .min(1, { message: "Họ tên không để trống" }),
  email: z
    .string({required_error: "Email là bắt buộc"})
    .email("Đây là email không hợp lệ"),
  birthday: z
    .date( {required_error: "Ngày sinh là bắt buộc"} )
}).superRefine(({ password, confirmPassword }, ctx) => {
  if (password != confirmPassword) {
    ctx.addIssue({
      code: "custom",
      message: "Mật khẩu không khớp",
      path: ["confirmPassword"]
    })
  }
});
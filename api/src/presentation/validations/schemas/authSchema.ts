import { z } from 'zod'

/**
 * ログインのリクエストバリデーションスキーマ
 */
export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(6)
      .max(100)
      .regex(/^(?=.*?[a-z])(?=.*?\d)[a-z\d]/i),
  }),
})

/**
 * ユーザー登録のリクエストバリデーションスキーマ
 */
export const registerSchema = z.object({
  body: z.object({
    username: z.string().min(3).max(20),
    email: z.string().email(),
    password: z.string().min(6).max(100),
  }),
})

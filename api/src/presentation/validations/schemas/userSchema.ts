import mongoose from 'mongoose'
import { z } from 'zod'

/**
 * ユーザー情報を取得のリクエストバリデーションスキーマ
 */
export const getUserSchema = z.object({
  params: z.object({
    // ユーザーID
    id: z.string().refine((val) => {
      return mongoose.Types.ObjectId.isValid(val)
    }),
  }),
})

/**
 * ユーザー情報を更新のリクエストバリデーションスキーマ
 */
export const updateUserSchema = z.object({
  params: z.object({
    id: z.string().refine((val) => {
      return mongoose.Types.ObjectId.isValid(val)
    }),
  }),
  body: z.object({
    // ユーザー名
    username: z.string().min(3).max(20).optional(),
    // メールアドレス
    email: z.string().email().max(50).optional(),
    // パスワード
    password: z
      .string()
      .min(6)
      .max(100)
      .regex(/^(?=.*?[a-z])(?=.*?\d)[a-z\d]/i)
      .optional(),
    // プロフィール画像URL
    profilePicture: z.string().optional(),
    // カバー画像URL
    coverPicture: z.string().optional(),
    // 管理者フラグ
    isAdmin: z.boolean().optional(),
    // 自己紹介
    description: z.string().max(500).optional(),
    // 居住地
    city: z.string().max(50).optional(),
    // 出身地
    from: z.string().max(50).optional(),
  }),
})

/**
 * ユーザー情報を削除のリクエストバリデーションスキーマ
 */
export const deleteUserSchema = z.object({
  params: z.object({
    // ユーザーID
    id: z.string().refine((val) => {
      return mongoose.Types.ObjectId.isValid(val)
    }),
  }),
})

/**
 * ユーザーをフォローのリクエストバリデーションスキーマ
 */
export const createFollowUserSchema = z.object({
  params: z.object({
    // ユーザーID
    id: z.string().refine((val) => {
      return mongoose.Types.ObjectId.isValid(val)
    }),
  }),
})

/**
 * ユーザーをフォロー解除のリクエストバリデーションスキーマ
 */
export const deleteFollowUserSchema = z.object({
  params: z.object({
    // ユーザーID
    id: z.string().refine((val) => {
      return mongoose.Types.ObjectId.isValid(val)
    }),
  }),
})

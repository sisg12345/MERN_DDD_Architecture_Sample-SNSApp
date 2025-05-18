import mongoose from 'mongoose'
import { z } from 'zod'

/**
 * 投稿を取得のリクエストバリデーションスキーマ
 */
export const getPostSchema = z.object({
  params: z.object({
    // 投稿ID
    id: z.string().refine((val) => {
      return mongoose.Types.ObjectId.isValid(val)
    }),
  }),
})

/**
 * 投稿を追加のリクエストバリデーションスキーマ
 *
 * TODO: 画像ファイルアップロード処理実装後に画像ファイルのバリデーションを修正
 */
export const createPostSchema = z.object({
  body: z.object({
    // 投稿内容
    message: z.string().max(500),
    // 画像
    image: z.string().optional(),
  }),
})

/**
 * 投稿を更新のリクエストバリデーションスキーマ
 * TODO: 画像ファイルアップロード処理実装後に画像ファイルのバリデーションを修正
 */
export const updatePostSchema = z.object({
  params: z.object({
    // 投稿ID
    id: z.string().refine((val) => {
      return mongoose.Types.ObjectId.isValid(val)
    }),
  }),
  body: z.object({
    // 投稿内容
    message: z.string().max(500),
    // 画像U
    image: z.string().optional(),
  }),
})

/**
 * 投稿を削除のリクエストバリデーションスキーマ
 */
export const deletePostSchema = z.object({
  params: z.object({
    // 投稿ID
    id: z.string().refine((val) => {
      return mongoose.Types.ObjectId.isValid(val)
    }),
  }),
})

/**
 * 投稿にいいねを追加のリクエストバリデーションスキーマ
 */
export const createPostLikeSchema = z.object({
  params: z.object({
    // 投稿ID
    id: z.string().refine((val) => {
      return mongoose.Types.ObjectId.isValid(val)
    }),
  }),
})

/**
 * 投稿にいいねを削除のリクエストバリデーションスキーマ
 */
export const deletePostLikeSchema = z.object({
  params: z.object({
    // 投稿ID
    id: z.string().refine((val) => {
      return mongoose.Types.ObjectId.isValid(val)
    }),
  }),
})

/**
 * ユーザーのタイムライン投稿を取得のリクエストバリデーションスキーマ
 */
export const getTimelinePostsSchema = z.object({
  params: z.object({
    // 投稿ID
    id: z.string().refine((val) => {
      return mongoose.Types.ObjectId.isValid(val)
    }),
  }),
})

import mongoose, { Schema, Document, Model } from 'mongoose'
import type { Post } from '@/types'

// 投稿の型定義
export type PostModel = Post & Document

// 投稿のスキーマ定義
const postSchema: Schema<PostModel> = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      max: 500,
    },
    image: {
      type: String,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
)

// モデルの作成
const MongoPost: Model<PostModel> = mongoose.model<PostModel>('Post', postSchema)

export default MongoPost

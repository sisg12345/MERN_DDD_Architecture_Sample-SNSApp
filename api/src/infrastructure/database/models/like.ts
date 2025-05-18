import mongoose, { Schema, Document, Model } from 'mongoose'
import type { Like } from '@/types'

// いいねの型定義
export type LikeModel = Like & Document

// いいねのスキーマ定義
const likeSchema: Schema<LikeModel> = new Schema(
  {
    postId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

// モデルの作成
const MongoLike: Model<LikeModel> = mongoose.model<LikeModel>('Like', likeSchema)

export default MongoLike

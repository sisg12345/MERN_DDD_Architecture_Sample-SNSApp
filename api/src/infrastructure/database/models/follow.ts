import mongoose, { Schema, Document, Model } from 'mongoose'
import type { Follow } from '@/types'

// フォローの型定義
export type FollowModel = Follow & Document

// ユーザースキーマ定義
const followSchema: Schema<FollowModel> = new Schema(
  {
    followerId: {
      type: String,
      required: true,
    },
    followingId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

// モデルの作成
const MongoFollow: Model<FollowModel> = mongoose.model<FollowModel>('Follow', followSchema)

export default MongoFollow

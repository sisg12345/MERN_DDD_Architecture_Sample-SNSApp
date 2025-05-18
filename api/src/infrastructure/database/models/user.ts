import mongoose, { Schema, Document, Model } from 'mongoose'
import type { User } from '@/types'

// ユーザーの型定義
export type UserModel = User & Document
// ユーザースキーマ定義
const userSchema: Schema<UserModel> = new Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      maxlength: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minxlength: 6,
      maxlength: 100,
    },
    profilePicture: {
      type: String,
      required: true,
    },
    coverPicture: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      maxlength: 500,
    },
    city: {
      type: String,
      maxlength: 50,
    },
    from: {
      type: String,
      maxlength: 50,
    },
  },
  { timestamps: true },
)

// モデルの作成
const MongoUser: Model<UserModel> = mongoose.model<UserModel>('User', userSchema)

export default MongoUser

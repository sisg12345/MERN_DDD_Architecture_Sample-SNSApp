import mongoose from 'mongoose'
import dotenv from 'dotenv'

// .envファイルの設定を読み込み
dotenv.config()

// .envファイルで設定したMONGO_URIを設定
const DATABASE_URL = process.env.MONGO_URI || ''

/**
 * MongoDBに接続
 */
const connectDB = async (): Promise<mongoose.Connection> => {
  try {
    const connection = await mongoose.connect(DATABASE_URL)

    return connection.connection
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`)
    } else {
      console.error('An unknown error occurred')
    }
    process.exit(1)
  }
}

export default connectDB

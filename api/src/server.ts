import 'reflect-metadata'
import express, { Express } from 'express'
import cors from 'cors'
import userRouter from '@/presentation/routes/user'
import authRouter from '@/presentation/routes/auth'
import postRouter from '@/presentation/routes/post'
import connectDB from '@/lib/mongoose'
import pinoHttp from 'pino-http'

const app: Express = express()
const PORT = process.env.PORT || 8000

// CORSを有効化
app.use(cors())

// HTTPリクエストのロギング
app.use(pinoHttp())

/**
 * MongoDBに接続
 */
connectDB()

/**
 * Middleware
 */
// リクエストボディーをJSON形式にパース
app.use(express.json())

app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)

/**
 * サーバー起動
 */
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

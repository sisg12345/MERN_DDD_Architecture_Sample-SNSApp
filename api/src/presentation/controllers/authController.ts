import type { Request, Response, NextFunction } from 'express'
import { Command as LoginHandlerCommand } from '@/application/useCase/auth/login/command'
import { Command as RegisterHandlerCommand } from '@/application/useCase/auth/register/command'
import { diContainer } from '../middlewares/di/inversify.config'
import { LoginHandler } from '@/application/useCase/auth/login/loginHandler'
import TYPES from '@/presentation/middlewares/di/symbol'
import { RegisterHandler } from '@/application/useCase/auth/register/registerHandler'
import { MESSAGE } from '@/shared/constants/message'
import jwt from 'jsonwebtoken'
import { generateToken } from '@/shared/utils/jwt'

/* eslint-disable @typescript-eslint/no-empty-object-type */

/**
 * ユーザーログイン
 */
export const login = async (
  req: Request<{}, {}, { email: string; password: string }>,
  res: Response,
) => {
  // インプットデータ
  const inputData = new LoginHandlerCommand(req.body.email, req.body.password)

  // DI
  const LoginHandler = diContainer.get<LoginHandler>(TYPES.ILoginHandler)
  // ユースケース実行
  const { status, message, data, accessToken, refreshToken } = await LoginHandler.handle(inputData)

  res.status(status).json({ message, data, accessToken, refreshToken })
}

/**
 * ユーザー登録
 */
export const register = async (
  req: Request<{}, {}, { username: string; email: string; password: string }>,
  res: Response,
) => {
  // インプットデータ
  const inputData = new RegisterHandlerCommand(
    req.body.email,
    req.body.password,
    req.body.username,
    '/default_user_icon.png',
    '/default_user_cover.png',
  )

  // DI
  const registerHandler = diContainer.get<RegisterHandler>(TYPES.IRegisterHandler)
  // ユースケース実行
  const { status, message, errors } = await registerHandler.handle(inputData)

  res.status(status).json({ message, errors })
}

/**
 * アクセストークン検証
 */
export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  // ヘッダーからトークンを取得
  const token = req.headers['authorization']?.split(' ')[1]

  // トークンが存在しない場合は401エラーを返す
  if (!token) {
    res.status(401).json({ message: MESSAGE.error.unauthorized })

    return
  }
  // シークレットキー
  const secretKey = process.env.JWT_SECRET_KEY as string

  // トークンを検証
  jwt.verify(token, secretKey, (error, decoded) => {
    // トークンが無効な場合は401エラーを返す
    if (error) {
      res.status(401).json({ message: MESSAGE.error.unauthorized })

      return
    }

    // トークンが有効な場合は、リクエストオブジェクトにユーザーIDを追加
    req.userId = (decoded as { userId: string }).userId

    next()
  })
}

/**
 * リフレッシュトークン検証
 */
export const verifyRefreshToken = async (req: Request, res: Response) => {
  // ボディーからトークンを取得
  const refreshToken = req.body.refreshToken as string

  // トークンが存在しない場合は401エラーを返す
  if (!refreshToken) {
    res.status(401).json({ message: MESSAGE.error.unauthorized })

    return
  }
  // シークレットキー
  const secretKey = process.env.REFRESH_TOKEN_SECRET_KEY as jwt.Secret | jwt.PublicKey

  // トークンを検証
  jwt.verify(refreshToken, secretKey, (error, decoded) => {
    // トークンが無効な場合は401エラーを返す
    if (error) {
      res.status(401).json({ message: MESSAGE.error.unauthorized })

      return
    }

    // リフレッシュトークンからユーザー情報を取得
    const { userId, email } = decoded as { userId: string; email: string }
    // アクセストークンを生成
    const accessToken = generateToken(userId, email)

    res.status(201).json({ accessToken })
  })
}

import express from 'express'
import { login, register, verifyRefreshToken } from '@/presentation/controllers/authController'
import { validate } from '@/presentation/validations/validate'
import { loginSchema, registerSchema } from '@/presentation/validations/schemas/authSchema'

const router = express.Router()

/**
 * ユーザーログイン
 */
router.post('/login', validate(loginSchema), login)

/**
 * ユーザー登録
 */
router.post('/register', validate(registerSchema), register)

/**
 * リフレッシュトークン検証
 */
router.post('/refresh_token', verifyRefreshToken)

export default router

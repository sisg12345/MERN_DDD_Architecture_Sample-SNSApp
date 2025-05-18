import express from 'express'
import { login, register, verifyRefreshToken } from '@/presentation/controllers/authController'

const router = express.Router()

/**
 * ユーザーログイン
 */
router.post('/login', login)

/**
 * ユーザー登録
 */
router.post('/register', register)

/**
 * リフレッシュトークン検証
 */
router.post('/refresh_token', verifyRefreshToken)

export default router

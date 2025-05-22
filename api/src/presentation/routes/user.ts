import express from 'express'
import {
  deleteUser,
  createFollowUser,
  getUser,
  updateUser,
  deleteFollower,
  getRecommendUser,
} from '@/presentation/controllers/userController'
import { verifyToken } from '@/presentation/controllers/authController'
import { validate } from '@/presentation/validations/validate'
import {
  createFollowUserSchema,
  deleteFollowUserSchema,
  deleteUserSchema,
  getUserSchema,
  updateUserSchema,
} from '@/presentation/validations/schemas/userSchema'

const router = express.Router()

/**
 * ユーザー情報を取得
 */
router.get('/:id', validate(getUserSchema), verifyToken, getUser)

/**
 * ユーザー情報を更新
 */
router.put('/:id', validate(updateUserSchema), verifyToken, updateUser)

/**
 * ユーザー情報を削除
 */
router.delete('/:id', validate(deleteUserSchema), verifyToken, deleteUser)

/**
 * ユーザーをフォロー
 */
router.put('/:id/follow', validate(createFollowUserSchema), verifyToken, createFollowUser)

/**
 * ユーザーをフォロー解除
 */
router.put('/:id/unfollow', validate(deleteFollowUserSchema), verifyToken, deleteFollower)

/**
 * おすすめユーザーを取得
 */

router.get('/recommends/all', verifyToken, getRecommendUser)

export default router

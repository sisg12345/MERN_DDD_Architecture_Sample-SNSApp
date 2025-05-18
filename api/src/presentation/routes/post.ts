import express from 'express'
import {
  createPost,
  createPostLike,
  deletePost,
  deletePostLike,
  getPost,
  getTimelineAllPosts,
  getTimelinePosts,
  updatePost,
} from '@/presentation/controllers/postController'
import { verifyToken } from '@/presentation/controllers/authController'
import { validate } from '@/presentation/validations/validate'
import {
  createPostLikeSchema,
  createPostSchema,
  deletePostLikeSchema,
  deletePostSchema,
  getPostSchema,
  getTimelinePostsSchema,
  updatePostSchema,
} from '@/presentation/validations/schemas/postSchema'

const router = express.Router()

/**
 * 投稿を取得
 */
router.get('/:id', validate(getPostSchema), verifyToken, getPost)

/**
 * 投稿を追加
 */
router.post('/', validate(createPostSchema), verifyToken, createPost)

/**
 * 投稿を更新
 */
router.put('/:id', validate(updatePostSchema), verifyToken, updatePost)

/**
 * 投稿を削除
 */
router.delete('/:id', validate(deletePostSchema), verifyToken, deletePost)

/**
 * 投稿にいいねを追加
 */
router.post('/:id/like', validate(createPostLikeSchema), verifyToken, createPostLike)

/**
 * 投稿にいいねを削除
 */
router.delete('/:id/unlike', validate(deletePostLikeSchema), verifyToken, deletePostLike)

/**
 * ユーザーのタイムライン投稿を取得
 */
router.get('/timeline/:id', validate(getTimelinePostsSchema), verifyToken, getTimelinePosts)

/**
 * すべてのタイムライン投稿を取得
 */
router.get('/timelines/all', verifyToken, getTimelineAllPosts)

export default router

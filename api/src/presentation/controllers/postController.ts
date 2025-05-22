import type { Request, Response } from 'express'
import type { Post } from '@/types'
import { diContainer } from '@/presentation/middlewares/di/inversify.config'
import TYPES from '@/presentation/middlewares/di/symbol'
import { GetPostHandler } from '@/application/useCase/post/getPost/getPostHandler'
import { Command as GetPostCommand } from '@/application/useCase/post/getPost/command'
import { Command as CreatePostCommand } from '@/application/useCase/post/createPost/command'
import { Command as UpdatePostCommand } from '@/application/useCase/post/updatePost/command'
import { Command as DeletePostCommand } from '@/application/useCase/post/deletePost/command'
import { Command as CreatePostLikeCommand } from '@/application/useCase/post/createPostLike/command'
import { Command as GetTimeLinePostsCommand } from '@/application/useCase/post/getTimeLinePosts/command'
import { Command as GetTimelineAllPostsCommand } from '@/application/useCase/post/getTimelineAllPosts/command'
import { CreatePostHandler } from '@/application/useCase/post/createPost/createPostHandler'
import { UpdatePostHandler } from '@/application/useCase/post/updatePost/updatePostHandler'
import { DeletePostHandler } from '@/application/useCase/post/deletePost/deletePostHandler'
import { CreatePostLikeHandler } from '@/application/useCase/post/createPostLike/createPostLikeHandler'
import { DeletePostLikeHandler } from '@/application/useCase/post/deletePostLike/deletePostLikeHandler'
import { GetTimeLinePostsHandler } from '@/application/useCase/post/getTimeLinePosts/getTimeLinePostsHandler'
import { GetTimelineAllPostsHandler } from '@/application/useCase/post/getTimelineAllPosts/getTimelineAllPostsHandler'

/* eslint-disable @typescript-eslint/no-empty-object-type */

/**
 * 投稿を取得
 */
export const getPost = async (req: Request<{ id: string }>, res: Response) => {
  // インプットデータ
  const inputData = new GetPostCommand(req.params.id)

  // DI
  const getPostHandler = diContainer.get<GetPostHandler>(TYPES.IGetPostHandler)
  // ユースケース実行
  const { status, message, data } = await getPostHandler.handle(inputData)

  res.status(status).json({ message, data })
}

/**
 * 投稿を追加
 */
export const createPost = async (
  req: Request<{}, {}, { message: string; image: string }>,
  res: Response,
) => {
  // インプットデータ
  const inputData = new CreatePostCommand(req.userId ?? '', req.body.message, req.body.image)

  // DI
  const createPostHandler = diContainer.get<CreatePostHandler>(TYPES.ICreatePostHandler)
  // ユースケース実行
  const { status, message } = await createPostHandler.handle(inputData)

  res.status(status).json({ message })
}

/**
 * 投稿を更新
 */
export const updatePost = async (req: Request<{ id: string }, {}, Post>, res: Response) => {
  // インプットデータ
  const inputData = new UpdatePostCommand(
    req.userId ?? '',
    req.params.id,
    req.body.message ?? '',
    req.body.image ?? '',
  )

  // DI
  const updatePostHandler = diContainer.get<UpdatePostHandler>(TYPES.IUpdatePostHandler)
  // ユースケース実行
  const { status, message } = await updatePostHandler.handle(inputData)

  res.status(status).json({ message })
}

/**
 * 投稿を削除
 */
export const deletePost = async (req: Request<{ id: string }, {}, Post>, res: Response) => {
  // インプットデータ
  const inputData = new DeletePostCommand(req.params.id, req.userId ?? '')

  // DI
  const deletePostHandler = diContainer.get<DeletePostHandler>(TYPES.IDeletePostHandler)
  // ユースケース実行
  const { status, message } = await deletePostHandler.handle(inputData)

  res.status(status).json({ message })
}

/**
 * 投稿にいいねを追加
 */
export const createPostLike = async (req: Request<{ id: string }>, res: Response) => {
  // インプットデータ
  const inputData = new CreatePostLikeCommand(req.params.id, req.userId ?? '')

  // DI
  const createPostLikeHandler = diContainer.get<CreatePostLikeHandler>(TYPES.ICreatePostLikeHandler)
  // ユースケース実行
  const { status, message } = await createPostLikeHandler.handle(inputData)

  res.status(status).json({ message })
}

/**
 * 投稿のいいねを削除
 */
export const deletePostLike = async (req: Request<{ id: string }>, res: Response) => {
  // インプットデータ
  const inputData = new CreatePostLikeCommand(req.params.id, req.userId ?? '')

  // DI
  const deletePostLikeHandler = diContainer.get<DeletePostLikeHandler>(TYPES.IDeletePostLikeHandler)
  // ユースケース実行
  const { status, message } = await deletePostLikeHandler.handle(inputData)

  res.status(status).json({ message })
}

/**
 * ユーザーのタイムライン投稿を取得
 */
export const getTimelinePosts = async (req: Request<{ id: string }>, res: Response) => {
  // インプットデータ
  const inputData = new GetTimeLinePostsCommand(req.userId ?? '', req.params.id)

  // DI
  const getTimeLinePostsHandler = diContainer.get<GetTimeLinePostsHandler>(
    TYPES.IGetTimeLinePostsHandler,
  )
  // ユースケース実行
  const { status, message, data } = await getTimeLinePostsHandler.handle(inputData)

  res.status(status).json({ message, data })
}

/**
 * すべてのタイムライン投稿を取得
 */
export const getTimelineAllPosts = async (req: Request, res: Response) => {
  // インプットデータ
  const inputData = new GetTimelineAllPostsCommand(req.userId ?? '')

  // DI
  const getTimelineAllPostsHandler = diContainer.get<GetTimelineAllPostsHandler>(
    TYPES.IGetTimelineAllPostsHandler,
  )
  // ユースケース実行
  const { status, message, data } = await getTimelineAllPostsHandler.handle(inputData)

  res.status(status).json({ message, data })
}

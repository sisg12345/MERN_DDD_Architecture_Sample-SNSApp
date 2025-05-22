import type { Request, Response } from 'express'
import { diContainer } from '@/presentation/middlewares/di/inversify.config'
import TYPES from '@/presentation/middlewares/di/symbol'
import { Command as GetUserCommand } from '@/application/useCase/user/getUser/command'
import { Command as UpdateUserCommand } from '@/application/useCase/user/updateUser/command'
import { Command as DeleteUserCommand } from '@/application/useCase/user/deleteUser/command'
import { Command as CreateFollowUserCommand } from '@/application/useCase/user/createFollower/command'
import { Command as DeleteFollowUserCommand } from '@/application/useCase/user/deleteFollower/command'
import { Command as GetRecommendUserCommand } from '@/application/useCase/user/getRecommendUser/command'
import { GetUserHandler } from '@/application/useCase/user/getUser/getUserHandler'
import { UpdateUserHandler } from '@/application/useCase/user/updateUser/updateUserHandler'
import { DeleteUserHandler } from '@/application/useCase/user/deleteUser/deleteUserHandler'
import { CreateFollowerHandler } from '@/application/useCase/user/createFollower/createFollowerHandler'
import { DeleteFollowerHandler } from '@/application/useCase/user/deleteFollower/deleteFollowerHandlerHandler'
import { GetRecommendUserHandler } from '@/application/useCase/user/getRecommendUser/getRecommendUserHandler'
import type { User } from '@/types'

/* eslint-disable @typescript-eslint/no-empty-object-type */

/**
 * ユーザー情報を取得
 */
export const getUser = async (req: Request<{ id: string }>, res: Response) => {
  // インプットデータ
  const inputData = new GetUserCommand(req.params.id)

  // DI
  const getUserHandler = diContainer.get<GetUserHandler>(TYPES.IGetUserHandler)
  // ユースケース実行
  const { status, message, data } = await getUserHandler.handle(inputData)

  res.status(status).json({ message, data })
}

/**
 * ユーザー情報を更新
 */
export const updateUser = async (req: Request<{ id: string }, {}, User>, res: Response) => {
  // インプットデータ
  const inputData = new UpdateUserCommand(req.userId ?? '', {
    ...req.body,
    id: req.params.id,
  })

  // DI
  const updateUserHandler = diContainer.get<UpdateUserHandler>(TYPES.IUpdateUserHandler)
  // ユースケース実行
  const { status, message } = await updateUserHandler.handle(inputData)

  res.status(status).json({ message })
}

/**
 * ユーザー情報を削除
 */
export const deleteUser = async (req: Request<{ id: string }>, res: Response) => {
  // インプットデータ
  const inputData = new DeleteUserCommand(req.userId ?? '', req.params.id)

  // DI
  const deleteUserHandler = diContainer.get<DeleteUserHandler>(TYPES.IDeleteUserHandler)
  // ユースケース実行
  const { status, message } = await deleteUserHandler.handle(inputData)

  res.status(status).json({ message })
}

/**
 * ユーザーをフォロー
 */
export const createFollowUser = async (req: Request<{ id: string }>, res: Response) => {
  // インプットデータ
  const inputData = new CreateFollowUserCommand(req.userId ?? '', req.params.id)

  // DI
  const createFollowUserHandler = diContainer.get<CreateFollowerHandler>(
    TYPES.ICreateFollowerHandler,
  )
  // ユースケース実行
  const { status, message } = await createFollowUserHandler.handle(inputData)

  res.status(status).json({ message })
}

/**
 * ユーザーをフォロー解除
 */
export const deleteFollower = async (req: Request<{ id: string }>, res: Response) => {
  // インプットデータ
  const inputData = new DeleteFollowUserCommand(req.userId ?? '', req.params.id)

  // DI
  const deleteFollowUserHandler = diContainer.get<DeleteFollowerHandler>(
    TYPES.IDeleteFollowerHandler,
  )
  // ユースケース実行
  const { status, message } = await deleteFollowUserHandler.handle(inputData)

  res.status(status).json({ message })
}

/**
 * おすすめユーザーを取得
 */
export const getRecommendUser = async (req: Request, res: Response) => {
  // インプットデータ
  const inputData = new GetRecommendUserCommand(req.userId ?? '', 10)

  // DI
  const getRecommendUserHandler = diContainer.get<GetRecommendUserHandler>(
    TYPES.IGetRecommendUserHandler,
  )
  // ユースケース実行
  const { status, message, data } = await getRecommendUserHandler.handle(inputData)

  res.status(status).json({ message, data })
}

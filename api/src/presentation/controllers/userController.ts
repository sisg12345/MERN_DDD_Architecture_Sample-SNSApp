import type { Request, Response } from 'express'
import { diContainer } from '@/presentation/middlewares/di/inversify.config'
import TYPES from '@/presentation/middlewares/di/symbol'
import { Command as GetUserHandlerCommand } from '@/application/useCase/user/getUser/command'
import { Command as UpdateUserHandlerCommand } from '@/application/useCase/user/updateUser/command'
import { Command as DeleteUserHandlerCommand } from '@/application/useCase/user/deleteUser/command'
import { Command as CreateFollowUserHandlerCommand } from '@/application/useCase/user/createFollower/command'
import { Command as DeleteFollowUserHandlerCommand } from '@/application/useCase/user/deleteFollower/command'
import { GetUserHandler } from '@/application/useCase/user/getUser/getUserHandler'
import { UpdateUserHandler } from '@/application/useCase/user/updateUser/updateUserHandler'
import { DeleteUserHandler } from '@/application/useCase/user/deleteUser/deleteUserHandler'
import { CreateFollowerHandler } from '@/application/useCase/user/createFollower/createFollowerHandler'
import { DeleteFollowerHandler } from '@/application/useCase/user/deleteFollower/deleteFollowerHandlerHandler'
import type { User } from '@/types'

/* eslint-disable @typescript-eslint/no-empty-object-type */

/**
 * ユーザー情報を取得
 */
export const getUser = async (req: Request<{ id: string }>, res: Response) => {
  // インプットデータ
  const inputData = new GetUserHandlerCommand(req.params.id)

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
  const inputData = new UpdateUserHandlerCommand(req.userId ?? '', {
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
  const inputData = new DeleteUserHandlerCommand(req.userId ?? '', req.params.id)

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
  const inputData = new CreateFollowUserHandlerCommand(req.userId ?? '', req.params.id)

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
  const inputData = new DeleteFollowUserHandlerCommand(req.userId ?? '', req.params.id)

  // DI
  const deleteFollowUserHandler = diContainer.get<DeleteFollowerHandler>(
    TYPES.IDeleteFollowerHandler,
  )
  // ユースケース実行
  const { status, message } = await deleteFollowUserHandler.handle(inputData)

  res.status(status).json({ message })
}

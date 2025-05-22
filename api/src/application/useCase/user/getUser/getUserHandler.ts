import { inject, injectable } from 'inversify'
import { Command } from './command'
import { IGetUserHandler } from './IGetUserHandler'
import TYPES from '@/presentation/middlewares/di/symbol'
import { IUserRepository } from '@/domain/interfaces/repositories/IUserRepository'
import { MESSAGE } from '@/shared/constants/message'
import type { ResponseResult } from '@/types/api'
import { NotFoundError } from '@/shared/errors/notFoundError'
import type { User } from '@/types'
import { UserModel } from '@/infrastructure/database/models/user'
import { log } from '@/shared/decorators/log'

@injectable()
export class GetUserHandler implements IGetUserHandler {
  constructor(@inject(TYPES.IUserRepository) private readonly _userRepository: IUserRepository) {}

  @log
  public async handle(command: Command): Promise<ResponseResult<Omit<User, 'password'>>> {
    let status = 200
    let message = MESSAGE.success.fetch
    let data: Omit<User, 'password'> | null = null

    try {
      // ユーザー情報を取得
      const user: UserModel | null = await this._userRepository.findById(command.userId)

      // ユーザー情報が存在しない場合はエラーをスロー
      if (!user) {
        throw new NotFoundError(MESSAGE.error.notFound)
      }

      // パスワードを除外
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rest } = user.toObject()
      data = rest
    } catch (error) {
      status = 500
      message = MESSAGE.error.server

      if (error instanceof NotFoundError) {
        status = error.status
        message = error.message
      }
    }

    return {
      status,
      message,
      data,
    }
  }
}

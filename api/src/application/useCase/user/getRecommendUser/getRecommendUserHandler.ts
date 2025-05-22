import { log } from '@/shared/decorators/log'
import { IGetRecommendUserHandler } from './IGetRecommendUserHandler'
import { injectable } from 'inversify'
import { Command } from './command'
import type { ResponseResult } from '@/types'
import { MESSAGE } from '@/shared/constants/message'
import { inject } from 'inversify'
import TYPES from '@/presentation/middlewares/di/symbol'
import { ILikeRepository } from '@/domain/interfaces/repositories/ILikeRepository'
import { IUserRepository } from '@/domain/interfaces/repositories/IUserRepository'

@injectable()
export class GetRecommendUserHandler implements IGetRecommendUserHandler {
  constructor(
    @inject(TYPES.IUserRepository) private readonly _userRepository: IUserRepository,
    @inject(TYPES.ILikeRepository) private readonly _likeRepository: ILikeRepository,
  ) {}

  @log
  public async handle(
    command: Command,
  ): Promise<ResponseResult<{ userId: string; username: string }[]>> {
    let status = 200
    let message = MESSAGE.success.fetch
    const data: { userId: string; username: string }[] = []

    try {
      // いいねの数が多いユーザーを取得（指定ユーザー以外、日付の新しい順）
      const topLikeUsers = await this._likeRepository.findTopLikeUsers(
        command.userId,
        command.count,
      )

      // いいねの数が多いユーザーの情報を取得
      await Promise.all(
        topLikeUsers.map(async (user) => {
          const userData = await this._userRepository.findById(user.userId)

          if (userData) {
            data.push({
              userId: user.userId,
              username: userData.username,
            })
          }
        }),
      )
    } catch {
      status = 500
      message = MESSAGE.error.server
    }

    return {
      status,
      message,
      data,
    }
  }
}

import { ResponseResult } from '@/types'
import { Command } from './command'
import { ICreateFollowerHandler } from './ICreateFollowerHandler'
import { inject, injectable } from 'inversify'
import TYPES from '@/presentation/middlewares/di/symbol'
import { IUserService } from '@/domain/interfaces/services/IUserService'
import { MESSAGE } from '@/shared/constants/message'
import { NotFoundError } from '@/shared/errors/notFoundError'
import { IFollowRepository } from '@/domain/interfaces/repositories/IFollowRepository'
import { ConflictError } from '@/shared/errors/conflictError'
import { log } from '@/shared/decorators/log'

@injectable()
export class CreateFollowerHandler implements ICreateFollowerHandler {
  constructor(
    @inject(TYPES.IUserService) private readonly _userService: IUserService,
    @inject(TYPES.IFollowRepository) private readonly _followRepository: IFollowRepository,
  ) {}

  @log
  public async handle(command: Command): Promise<ResponseResult> {
    let status = 201
    let message = MESSAGE.success.create

    try {
      // バリデーション
      await this.validate(command)

      // フォロワーを追加
      this._followRepository.addFollower(command.followerId, command.followingId)
    } catch (error) {
      status = 500
      message = MESSAGE.error.server

      if (error instanceof NotFoundError || error instanceof ConflictError) {
        status = error.status
        message = error.message
      }
    }

    return {
      status,
      message,
    }
  }

  /**
   * バリデーション
   *
   * @param command インプットデータ
   */
  @log
  private async validate(command: Command): Promise<void> | never {
    // フォロワーの存在チェック
    await this._userService.isFollowingExists(command.followerId, command.followingId, 'isExist')
  }
}

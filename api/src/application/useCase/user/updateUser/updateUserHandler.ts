import { inject, injectable } from 'inversify'
import { Command } from './command'
import { IUpdateUserHandler } from './IUpdateUserHandler'
import TYPES from '@/presentation/middlewares/di/symbol'
import { IUserRepository } from '@/domain/interfaces/repositories/IUserRepository'
import { MESSAGE } from '@/shared/constants/message'
import type { ResponseResult } from '@/types/api'
import { NotFoundError } from '@/shared/errors/notFoundError'
import { ForbiddenError } from '@/shared/errors/forbiddenError'
import { IUserService } from '@/domain/interfaces/services/IUserService'
import { ConflictError } from '@/shared/errors/conflictError'
import { log } from '@/shared/decorators/log'

@injectable()
export class UpdateUserHandler implements IUpdateUserHandler {
  constructor(
    @inject(TYPES.IUserService) private readonly _userService: IUserService,
    @inject(TYPES.IUserRepository) private readonly _userRepository: IUserRepository,
  ) {}

  @log
  public async handle(command: Command): Promise<ResponseResult> {
    let status = 200
    let message = MESSAGE.success.update

    try {
      // バリデーション
      await this.validate(command)

      // ユーザー情報を更新
      await this._userRepository.updateUser(command.updateData.id, command.updateData)
    } catch (error) {
      status = 500
      message = MESSAGE.error.server

      if (
        error instanceof NotFoundError ||
        error instanceof ForbiddenError ||
        error instanceof ConflictError
      ) {
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
  private async validate(command: Command): Promise<void> {
    // ユーザーの存在チェック
    await this._userService.isUserExits(command.updateData.id)
    // 変更しようとするメールアドレスとユーザー名が、他のユーザーに登録されていないか確認
    if (command.updateData.email && command.updateData.username) {
      await this._userService.isEmailOrUserUsed(
        command.updateData.id,
        command.updateData.email,
        command.updateData.username,
      )
    }
    // ユーザーの更新権限チェック
    await this._userService.hasUpdateAuthority(command.userId)
  }
}

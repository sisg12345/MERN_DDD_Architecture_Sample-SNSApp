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
import { UserModel } from '@/infrastructure/database/models/user'

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
    const errors: Record<string, string> = {}

    try {
      // バリデーション
      await this.validate(command, errors)

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
      errors,
    }
  }

  /**
   * バリデーション
   *
   * @param command インプットデータ
   */
  @log
  private async validate(command: Command, errors: Record<string, string>): Promise<void> | never {
    // ユーザー名の存在チェック
    const username = await this._userRepository.findUserByUsername(command.updateData.username!)
    if (username && username.id !== command.userId) {
      errors.username = MESSAGE.error.usernameAlreadyExists
    }

    // メールアドレスの存在チェック
    const email = await this._userRepository.findUserByEmail(command.updateData.email!)
    if (email && email.id !== command.userId) {
      errors.email = MESSAGE.error.emailAlreadyExists
    }

    if (Object.keys(errors).length > 0) {
      throw new ConflictError()
    }
    // ユーザーの更新権限チェック
    await this._userService.hasUpdateAuthority(command.userId)
  }
}

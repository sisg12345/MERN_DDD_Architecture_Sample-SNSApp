import { Command } from './command'
import { injectable } from 'inversify'
import { inject } from 'inversify'
import { IUserRepository } from '@/domain/interfaces/repositories/IUserRepository'
import TYPES from '@/presentation/middlewares/di/symbol'
import { MESSAGE } from '@/shared/constants/message'
import type { ResponseResult } from '@/types'
import bcrypt from 'bcrypt'
import { IRegisterHandler } from './IRegisterHandler'
import { ConflictError } from '@/shared/errors/conflictError'
import { log } from '@/shared/decorators/log'

@injectable()
export class RegisterHandler implements IRegisterHandler {
  constructor(@inject(TYPES.IUserRepository) private _userRepository: IUserRepository) {}

  @log
  public async handle(command: Command): Promise<ResponseResult> {
    let status = 201
    let message = MESSAGE.success.create
    const errors: Record<string, string> = {}

    try {
      // バリデーション
      await this.validate(command, errors)

      // パスワードのハッシュ化
      const slat = await bcrypt.genSalt()
      const hashedPassword = await bcrypt.hash(command.password, slat)
      // ユーザーの作成
      await this._userRepository.createUser(
        command.email,
        hashedPassword,
        command.username,
        command.profilePicture,
        command.coverPicture,
      )
    } catch (error) {
      status = 500
      message = MESSAGE.error.server

      // エラー
      if (error instanceof ConflictError) {
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
    const username = await this._userRepository.findUserByUsername(command.username)
    if (username) {
      errors.username = MESSAGE.error.usernameAlreadyExists
    }

    const email = await this._userRepository.findUserByEmail(command.email)
    if (email) {
      errors.email = MESSAGE.error.emailAlreadyExists
    }

    if (Object.keys(errors).length > 0) {
      throw new ConflictError()
    }
  }
}

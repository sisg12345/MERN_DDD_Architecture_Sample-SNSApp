import { Command } from './command'
import { ILoginHandler } from './ILoginHandler'
import { injectable } from 'inversify'
import { inject } from 'inversify'
import { IUserRepository } from '@/domain/interfaces/repositories/IUserRepository'
import TYPES from '@/presentation/middlewares/di/symbol'
import { MESSAGE } from '@/shared/constants/message'
import { UnauthorizedError } from '@/shared/errors/unauthorizedError'
import type { LoginUser, ResponseResult } from '@/types'
import bcrypt from 'bcrypt'
import { generateRefreshToken, generateToken } from '@/shared/utils/jwt'
import { log } from '@/shared/decorators/log'

@injectable()
export class LoginHandler implements ILoginHandler {
  constructor(@inject(TYPES.IUserRepository) private _userRepository: IUserRepository) {}

  @log
  public async handle(command: Command): Promise<ResponseResult<LoginUser>> {
    let status = 200
    let message = MESSAGE.success.auth
    let accessToken: string = ''
    let refreshToken: string = ''
    let data: LoginUser = { userId: '', username: '' }

    try {
      const user = await this._userRepository.findUserByEmail(command.email)

      // 一致するユーザーが存在しない場合は認証エラーをスロー
      if (!user) {
        throw new UnauthorizedError()
      }

      // パスワード一致結果
      const math = await bcrypt.compare(command.password, user.password)
      // パスワードが一致しない場合は認証エラーをスロー
      if (!math) {
        throw new UnauthorizedError()
      }

      // ユーザー情報
      data = { userId: user.id, username: user.username }
      // アクセスえトークンの生成
      accessToken = generateToken(user.id, user.email)
      // リフレッシュトークンの生成
      refreshToken = generateRefreshToken(user.id, user.email)
    } catch (error) {
      status = 500
      message = MESSAGE.error.server

      // エラー
      if (error instanceof UnauthorizedError) {
        status = error.status
        message = MESSAGE.error.login
      }
    }

    return {
      status,
      message,
      data,
      accessToken,
      refreshToken,
    }
  }
}

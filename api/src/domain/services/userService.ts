import { inject, injectable } from 'inversify'
import { IUserService } from '../interfaces/services/IUserService'
import { IUserRepository } from '../interfaces/repositories/IUserRepository'
import TYPES from '@/presentation/middlewares/di/symbol'
import { NotFoundError } from '@/shared/errors/notFoundError'
import { ForbiddenError } from '@/shared/errors/forbiddenError'
import { IFollowRepository } from '../interfaces/repositories/IFollowRepository'
import { ConflictError } from '@/shared/errors/conflictError'
import { MESSAGE } from '@/shared/constants/message'
import { log } from '@/shared/decorators/log'

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(TYPES.IUserRepository) private _userRepository: IUserRepository,
    @inject(TYPES.IFollowRepository) private _followRepository: IFollowRepository,
  ) {}

  /**
   *  ユーザーが存在するかどうかを確認
   *
   * @param userId ユーザーID
   */
  @log
  public async isUserExits(userId: string): Promise<boolean> | never {
    // ユーザーを取得
    const user = await this._userRepository.findById(userId)

    // ユーザーが存在しない場合は404エラーをスロー
    if (!user) {
      throw new NotFoundError()
    }

    return true
  }

  /**
   * 変更しようとするメールアドレスとユーザー名が、他のユーザーに登録されていないか確認
   *
   * @param userId ユーザーID
   * @param email メールアドレス
   * @param username ユーザー名
   */
  @log
  public async isEmailOrUserUsed(
    userId: string,
    email: string,
    username: string,
  ): Promise<boolean> | never {
    // ユーザーを取得
    let user = await this._userRepository.findUserByEmail(email)
    // ユーザーが存在しない場合は404エラーをスロー
    if (!user) {
      throw new NotFoundError()
    }
    // メールアドレスが既に別のユーザーに登録されている場合は409エラーをスロー
    if (user.id !== userId) {
      throw new ConflictError()
    }

    user = await this._userRepository.findUserByUsername(username)
    // ユーザーが存在しない場合は404エラーをスロー
    if (!user) {
      throw new NotFoundError()
    }
    // ユーザー名が既に別のユーザーに登録されている場合は409エラーをスロー
    if (user.id !== userId) {
      throw new ConflictError()
    }

    return true
  }

  /**
   * ユーザーが登録済みではないことを確認
   *
   * @param username ユーザー名
   * @param email メールアドレス
   */
  @log
  public async isUserNoExits(username: string, email: string): Promise<boolean> | never {
    // ユーザーを取得
    let user = await this._userRepository.findUserByEmail(email)

    // メールアドレスが存在する場合は409エラーをスロー
    if (user) {
      throw new ConflictError(MESSAGE.error.emailAlreadyExists)
    }

    user = await this._userRepository.findUserByUsername(username)
    // ユーザーが存在する場合は409エラーをスロー
    if (user) {
      throw new ConflictError(MESSAGE.error.usernameAlreadyExists)
    }

    return true
  }

  /**
   * フォロワーがいるかどうかの存在チェック
   *
   * @param followerId フォロワーのユーザーID
   * @param followingId フォローユーザーID
   * @returns boolean
   */
  public async isFollowingExists(
    followerId: string,
    followingId: string,
    throwErrorType: 'isExist' | 'notExist' = 'notExist',
  ): Promise<boolean> | never {
    // フォロワーを取得
    const follower = await this._followRepository.findFollower(followerId, followingId)

    // フォロワーする場合はコンフリクトエラーをスロー
    if (throwErrorType === 'isExist' && follower) {
      throw new ConflictError()
    }
    // フォロワーが存在しない場合は404エラーをスロー
    else if (throwErrorType === 'notExist' && follower == null) {
      throw new NotFoundError()
    }

    return true
  }

  /**
   * 更新権限があるかどうかを確認
   *
   * @param userId ユーザーID
   */
  @log
  public async hasUpdateAuthority(userId: string): Promise<boolean> | never {
    // ユーザーを取得
    const user = await this._userRepository.findById(userId)

    // ユーザーが存在しない場合は404エラーをスロー
    if (!user) {
      throw new NotFoundError()
    }
    // ユーザーIDが一致するもしくは、管理者である場合は権限OK
    if (user.id === userId || user.isAdmin) {
      return true
    }

    // ユーザーIDが一致しないもしくは、管理者でない場合は権限エラーをスロー
    throw new ForbiddenError()
  }
}

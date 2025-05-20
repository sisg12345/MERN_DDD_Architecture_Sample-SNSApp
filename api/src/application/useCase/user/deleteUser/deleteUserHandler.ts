import { inject, injectable } from 'inversify'
import { Command } from './command'
import { IDeleteUserHandler } from './IDeleteUserHandler'
import TYPES from '@/presentation/middlewares/di/symbol'
import { IUserRepository } from '@/domain/interfaces/repositories/IUserRepository'
import { MESSAGE } from '@/shared/constants/message'
import type { ResponseResult } from '@/types/api'
import { NotFoundError } from '@/shared/errors/notFoundError'
import { ForbiddenError } from '@/shared/errors/forbiddenError'
import { IUserService } from '@/domain/interfaces/services/IUserService'
import { ILikeRepository } from '@/domain/interfaces/repositories/ILikeRepository'
import { IPostRepository } from '@/domain/interfaces/repositories/IPostRepository'
import { IFollowRepository } from '@/domain/interfaces/repositories/IFollowRepository'
import { log } from '@/shared/decorators/log'

@injectable()
export class DeleteUserHandler implements IDeleteUserHandler {
  constructor(
    @inject(TYPES.IUserService) private readonly _userService: IUserService,
    @inject(TYPES.IUserRepository) private readonly _userRepository: IUserRepository,
    @inject(TYPES.IPostRepository) private readonly _postRepository: IPostRepository,
    @inject(TYPES.ILikeRepository) private readonly _likeRepository: ILikeRepository,
    @inject(TYPES.IFollowRepository) private readonly _followRepository: IFollowRepository,
  ) {}

  @log
  public async handle(command: Command): Promise<ResponseResult> {
    let status = 200
    let message = MESSAGE.success.delete

    try {
      // バリデーション
      await this.validate(command)

      // ユーザー削除
      await this._userRepository.deleteUser(command.deleteUserId)
      // フォロワー削除
      await this._followRepository.deleteFollowerByFollowerId(command.deleteUserId)
      // 投稿を取得
      const posts = await this._postRepository.findPostsByUserId(command.deleteUserId)
      // 投稿を削除
      await this._postRepository.deletePostByUserId(command.deleteUserId)
      // 投稿ID一覧
      const postIds = posts.map((post) => post.id)
      // 投稿のいいねを削除
      await this._likeRepository.deletePostLike(postIds)
    } catch (error) {
      status = 500
      message = MESSAGE.error.server

      if (error instanceof NotFoundError || error instanceof ForbiddenError) {
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
    await this._userService.isUserExits(command.deleteUserId)
    // ユーザーの更新健康チェック
    await this._userService.hasUpdateAuthority(command.userId)
  }
}

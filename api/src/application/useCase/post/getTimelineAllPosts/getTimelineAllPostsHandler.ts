import { inject, injectable } from 'inversify'
import { Command } from './command'
import type { ResponseResult } from '@/types'
import TYPES from '@/presentation/middlewares/di/symbol'
import { IPostRepository } from '@/domain/interfaces/repositories/IPostRepository'
import { IFollowRepository } from '@/domain/interfaces/repositories/IFollowRepository'
import { MESSAGE } from '@/shared/constants/message'
import { IGetTimelineAllPostsHandler } from './IGetTimelineAllPostsHandler'
import { IPostService } from '@/domain/interfaces/services/IPostService'
import { NotFoundError } from '@/shared/errors/notFoundError'
import { IUserService } from '@/domain/interfaces/services/IUserService'
import type { PostModel } from '@/infrastructure/database/models/post'
import { log } from '@/shared/decorators/log'

@injectable()
export class GetTimelineAllPostsHandler implements IGetTimelineAllPostsHandler {
  constructor(
    @inject(TYPES.IUserService) private readonly _userService: IUserService,
    @inject(TYPES.IPostService) private readonly _postService: IPostService,
    @inject(TYPES.IPostRepository) private readonly _postRepository: IPostRepository,
    @inject(TYPES.IFollowRepository) private readonly _followRepository: IFollowRepository,
  ) {}

  @log
  public async handle(command: Command): Promise<ResponseResult<PostModel[]>> {
    let status = 200
    let message = MESSAGE.success.fetch
    let data: PostModel[] | null = null

    try {
      // バリデーション
      this.validate(command)

      // ユーザーの投稿を取得
      const userPosts = await this._postRepository.findPostsByUserId(command.userId)
      // フォローしているユーザー一覧を取得
      const followings = await this._followRepository.findFollowingsByFollowerId(command.userId)
      // フォローしているユーザーのID一覧
      const followUserIds = followings.map((following) => following.followerId)
      // フォローしているユーザーの投稿を取得
      const followUserPosts = await this._postRepository.findPostsByUserIds(followUserIds)

      // 自分の投稿とフォローしているユーザーの投稿を結合
      const posts = [...userPosts, ...followUserPosts].sort((m, n) => {
        return new Date(n.createdAt).getTime() - new Date(m.createdAt).getTime()
      })
      // 投稿情報を追加
      data = await this._postService.addPostInfo(command.userId, posts)
    } catch (error) {
      status = 500
      message = MESSAGE.error.server

      // バリデーションエラー
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

  /**
   * バリデーション
   *
   * @param command インプットデータ
   */
  @log
  private async validate(command: Command): Promise<void> | never {
    // ユーザーの存在チェック
    await this._userService.isUserExits(command.userId)
  }
}

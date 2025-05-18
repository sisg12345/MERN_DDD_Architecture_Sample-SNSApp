import { inject, injectable } from 'inversify'
import { Command } from './command'
import { IGetTimeLinePostsHandler } from './IGetTimeLinePostsHandler'
import type { Post, ResponseResult } from '@/types'
import TYPES from '@/presentation/middlewares/di/symbol'
import { IPostRepository } from '@/domain/interfaces/repositories/IPostRepository'
import { MESSAGE } from '@/shared/constants/message'
import { IPostService } from '@/domain/interfaces/services/IPostService'
import { NotFoundError } from '@/shared/errors/notFoundError'
import { IUserService } from '@/domain/interfaces/services/IUserService'
import { log } from '@/shared/decorators/log'

@injectable()
export class GetTimeLinePostsHandler implements IGetTimeLinePostsHandler {
  constructor(
    @inject(TYPES.IUserService) private readonly _userService: IUserService,
    @inject(TYPES.IPostService) private readonly _postService: IPostService,
    @inject(TYPES.IPostRepository) private readonly _postRepository: IPostRepository,
  ) {}

  @log
  public async handle(command: Command): Promise<ResponseResult<Post[]>> {
    let status = 200
    let message = MESSAGE.success.fetch
    let data: Post[] | null = null

    try {
      // バリデーション
      await this.validate(command)

      // ユーザーの投稿を取得
      const userPosts = await this._postRepository.findPostsByUserId(command.userId)

      // 自分の投稿とフォローしているユーザーの投稿を結合
      const posts = [...userPosts].sort((m, n) => {
        return new Date(m.createdAt).getTime() - new Date(n.createdAt).getTime()
      })

      // 投稿にユーザーがいいね済み情報を追加
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

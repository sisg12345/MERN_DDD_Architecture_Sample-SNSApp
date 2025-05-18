import { inject, injectable } from 'inversify'
import { Command } from './command'
import { MESSAGE } from '@/shared/constants/message'
import { ValidationError } from '@/shared/errors/validationError'
import TYPES from '@/presentation/middlewares/di/symbol'
import { IPostRepository } from '@/domain/interfaces/repositories/IPostRepository'
import { IPostService } from '@/domain/interfaces/services/IPostService'
import { ICreatePostLikeHandler } from './ICreatePostLikeHandler'
import type { ResponseResult } from '@/types'
import { ConflictError } from '@/shared/errors/conflictError'
import { log } from '@/shared/decorators/log'

@injectable()
export class CreatePostLikeHandler implements ICreatePostLikeHandler {
  constructor(
    @inject(TYPES.IPostService) private readonly _postService: IPostService,
    @inject(TYPES.IPostRepository) private readonly _postRepository: IPostRepository,
  ) {}

  @log
  public async handle(command: Command): Promise<ResponseResult> {
    let status = 201
    let message = MESSAGE.success.create

    try {
      // バリデーション
      await this.validate(command)

      // いいねを追加
      await this._postRepository.addPostLike(command.postId, command.userId)
      // 投稿のいいねの数を更新
      await this._postService.updatePostLikeCount(command.postId, 1)
    } catch (error) {
      status = 500
      message = MESSAGE.error.server

      // バリデーションエラー
      if (error instanceof ValidationError || error instanceof ConflictError) {
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
    // ユーザーがいいねをしている投稿の存在チェック
    await this._postService.isUserLikedPostExits(command.postId, command.userId, 'isExist')
  }
}

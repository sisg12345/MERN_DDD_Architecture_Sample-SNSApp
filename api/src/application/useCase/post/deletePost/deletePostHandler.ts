import { IPostService } from '@/domain/interfaces/services/IPostService'
import type { ResponseResult } from '@/types/api'
import { injectable } from 'inversify'
import { Command } from './command'
import { MESSAGE } from '@/shared/constants/message'
import { ForbiddenError } from '@/shared/errors/forbiddenError'
import { ValidationError } from '@/shared/errors/validationError'
import { NotFoundError } from '@/shared/errors/notFoundError'
import { inject } from 'inversify'
import TYPES from '@/presentation/middlewares/di/symbol'
import { IPostRepository } from '@/domain/interfaces/repositories/IPostRepository'
import { IDeletePostHandler } from './IDeletePostHandler'
import { log } from '@/shared/decorators/log'

@injectable()
export class DeletePostHandler implements IDeletePostHandler {
  constructor(
    @inject(TYPES.IPostService) private readonly _postService: IPostService,
    @inject(TYPES.IPostRepository) private readonly _postRepository: IPostRepository,
  ) {}

  @log
  async handle(command: Command): Promise<ResponseResult> {
    let status = 200
    let message = MESSAGE.success.delete

    try {
      // バリデーション
      await this.validate(command)

      // 投稿を削除
      this._postRepository.deletePost(command.postId)
    } catch (error) {
      status = 500
      message = MESSAGE.error.server

      // バリデーションエラー
      if (
        error instanceof ValidationError ||
        error instanceof NotFoundError ||
        error instanceof ForbiddenError
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
  private async validate(command: Command): Promise<void> | never {
    // 投稿したユーザーがかどうかのチェック
    await this._postService.isPostUser(command.postId, command.userId)
  }
}

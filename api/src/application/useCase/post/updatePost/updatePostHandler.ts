import { Command } from './command'
import type { ResponseResult } from '@/types/api'
import { IUpdatePostHandler } from './IUpdatePostHandler'
import { MESSAGE } from '@/shared/constants/message'
import { ValidationError } from '@/shared/errors/validationError'
import { inject, injectable } from 'inversify'
import { IPostRepository } from '@/domain/interfaces/repositories/IPostRepository'
import TYPES from '@/presentation/middlewares/di/symbol'
import { IPostService } from '@/domain/interfaces/services/IPostService'
import { ForbiddenError } from '@/shared/errors/forbiddenError'
import { NotFoundError } from '@/shared/errors/notFoundError'
import { log } from '@/shared/decorators/log'

@injectable()
export class UpdatePostHandler implements IUpdatePostHandler {
  constructor(
    @inject(TYPES.IPostService) private readonly _postService: IPostService,
    @inject(TYPES.IPostRepository) private readonly _postRepository: IPostRepository,
  ) {}

  @log
  public async handle(command: Command): Promise<ResponseResult> {
    let status = 200
    let message = MESSAGE.success.update

    try {
      // バリデーション
      await this.validate(command)

      // 投稿を更新
      await this._postRepository.updatePost(command.postId, command.message, command.image)
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
    // 投稿内容が存在するかチェック
    if (command.message.trim().length === 0 && command.image.trim().length === 0) {
      throw new ValidationError()
    }

    // 投稿したユーザーがかどうかのチェック
    await this._postService.isPostUser(command.postId, command.userId)
  }
}

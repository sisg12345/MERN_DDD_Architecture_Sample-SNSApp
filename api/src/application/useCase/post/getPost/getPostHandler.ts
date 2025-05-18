import { injectable, inject } from 'inversify'
import { Command } from './command'
import { IGetPostHandler } from './IGetPostHandler'
import TYPES from '@/presentation/middlewares/di/symbol'
import { IPostService } from '@/domain/interfaces/services/IPostService'
import type { ResponseResult } from '@/types/api'
import { NotFoundError } from '@/shared/errors/notFoundError'
import { MESSAGE } from '@/shared/constants/message'
import { IPostRepository } from '@/domain/interfaces/repositories/IPostRepository'
import { ValidationError } from '@/shared/errors/validationError'
import type { PostModel } from '@/infrastructure/database/models/post'
import { log } from '@/shared/decorators/log'

@injectable()
export class GetPostHandler implements IGetPostHandler {
  constructor(
    @inject(TYPES.IPostService) private readonly _postService: IPostService,
    @inject(TYPES.IPostRepository) private readonly _postRepository: IPostRepository,
  ) {}

  @log
  public async handle(command: Command): Promise<ResponseResult<PostModel>> {
    let status = 200
    let message = MESSAGE.success.fetch
    let data: PostModel | null = null

    try {
      // バリデーション
      await this.validate(command)

      // 投稿を取得
      data = await this._postRepository.findPostById(command.postId)
    } catch (error) {
      status = 500
      message = MESSAGE.error.server

      // バリデーションエラー
      if (error instanceof ValidationError || error instanceof NotFoundError) {
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
    // 投稿の存在チェック
    await this._postService.isPostExists(command.postId)
  }
}

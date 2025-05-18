import { IPostRepository } from '@/domain/interfaces/repositories/IPostRepository'
import { inject, injectable } from 'inversify'
import type { ResponseResult } from '@/types/api'
import { MESSAGE } from '@/shared/constants/message'
import { ValidationError } from '@/shared/errors/validationError'
import TYPES from '@/presentation/middlewares/di/symbol'
import { ICreatePostHandler } from './ICreatePostHandler'
import { Command } from './command'
import { log } from '@/shared/decorators/log'

@injectable()
export class CreatePostHandler implements ICreatePostHandler {
  constructor(@inject(TYPES.IPostRepository) private readonly _postRepository: IPostRepository) {}

  @log
  public async handle(command: Command): Promise<ResponseResult> {
    let status = 201
    let message = MESSAGE.success.create

    try {
      // 投稿を追加
      await this._postRepository.createPost(command.userId, command.message, command.image)
    } catch (error) {
      status = 500
      message = MESSAGE.error.server

      // バリデーションエラー
      if (error instanceof ValidationError) {
        status = error.status
        message = error.message
      }
    }

    return {
      status,
      message,
    }
  }
}

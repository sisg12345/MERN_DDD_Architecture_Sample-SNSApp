import { Command } from './command'
import type { ResponseResult } from '@/types/api'

export interface IDeletePostLikeHandler {
  handle(command: Command): Promise<ResponseResult>
}

import { Command } from './command'
import type { ResponseResult } from '@/types/api'

export interface ICreatePostLikeHandler {
  handle(command: Command): Promise<ResponseResult>
}

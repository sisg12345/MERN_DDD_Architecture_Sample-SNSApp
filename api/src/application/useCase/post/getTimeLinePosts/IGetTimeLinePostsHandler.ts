import { Command } from './command'
import type { ResponseResult } from '@/types/api'

export interface IGetTimeLinePostsHandler {
  handle(command: Command): Promise<ResponseResult>
}

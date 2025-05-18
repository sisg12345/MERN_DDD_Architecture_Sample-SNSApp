import { Command } from './command'
import type { ResponseResult } from '@/types/api'

export interface IGetTimelineAllPostsHandler {
  handle(command: Command): Promise<ResponseResult>
}

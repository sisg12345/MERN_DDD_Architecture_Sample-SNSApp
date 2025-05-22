import { Command } from './command'
import type { ResponseResult } from '@/types'

export interface IGetRecommendUserHandler {
  handle(command: Command): Promise<ResponseResult>
}

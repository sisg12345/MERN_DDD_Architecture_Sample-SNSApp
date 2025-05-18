import { Command } from './command'
import type { ResponseResult } from '@/types/api'

export interface IGetPostHandler {
  handle(command: Command): Promise<ResponseResult>
}

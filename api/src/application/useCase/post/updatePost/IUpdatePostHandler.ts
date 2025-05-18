import { Command } from './command'
import type { ResponseResult } from '@/types/api'

export interface IUpdatePostHandler {
  handle(command: Command): Promise<ResponseResult>
}

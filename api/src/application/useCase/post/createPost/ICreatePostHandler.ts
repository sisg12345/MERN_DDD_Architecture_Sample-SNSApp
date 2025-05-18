import { Command } from './command'
import type { ResponseResult } from '@/types/api'

export interface ICreatePostHandler {
  handle(command: Command): Promise<ResponseResult>
}

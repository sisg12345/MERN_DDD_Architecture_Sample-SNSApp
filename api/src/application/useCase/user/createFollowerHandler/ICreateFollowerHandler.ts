import { Command } from './command'
import type { ResponseResult } from '@/types'

export interface ICreateFollowerHandler {
  handle(command: Command): Promise<ResponseResult>
}

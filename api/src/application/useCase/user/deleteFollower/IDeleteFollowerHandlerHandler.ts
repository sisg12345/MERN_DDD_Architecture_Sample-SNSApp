import { Command } from './command'
import type { ResponseResult } from '@/types'

export interface IDeleteFollowerHandler {
  handle(command: Command): Promise<ResponseResult>
}

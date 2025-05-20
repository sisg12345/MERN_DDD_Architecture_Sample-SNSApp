import { Command } from './command'
import type { ResponseResult } from '@/types/api'

export interface IUpdateUserHandler {
  handle(command: Command): Promise<ResponseResult>
}

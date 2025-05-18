import { Command } from './command'
import type { ResponseResult } from '@/types'

export interface IDeleteUserHandler {
  handle(command: Command): Promise<ResponseResult>
}

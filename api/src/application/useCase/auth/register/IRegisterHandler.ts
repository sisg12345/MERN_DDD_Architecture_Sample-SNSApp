import { Command } from './command'
import type { ResponseResult } from '@/types'

export interface IRegisterHandler {
  handle(command: Command): Promise<ResponseResult>
}

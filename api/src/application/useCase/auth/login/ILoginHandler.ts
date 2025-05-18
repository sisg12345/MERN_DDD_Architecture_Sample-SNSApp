import { Command } from './command'
import type { ResponseResult } from '@/types'

export interface ILoginHandler {
  handle(command: Command): Promise<ResponseResult>
}

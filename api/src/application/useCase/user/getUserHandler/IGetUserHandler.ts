import { Command } from './command'
import type { ResponseResult } from '@/types/api'

/**
 * ユーザー情報取得ハンドラーのインターフェース
 */
export interface IGetUserHandler {
  handle(command: Command): Promise<ResponseResult>
}

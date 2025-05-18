import { MESSAGE } from '@/shared/constants/message'

/**
 * コンフリクトエラー
 */
export class ConflictError extends Error {
  // ステータスコード
  public readonly status = 409
  // エラー名
  public readonly name = 'ConflictError'

  constructor(message = MESSAGE.error.conflict) {
    super(message)
  }
}

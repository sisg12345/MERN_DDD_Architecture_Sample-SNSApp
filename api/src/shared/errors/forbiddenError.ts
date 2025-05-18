import { MESSAGE } from '@/shared/constants/message'

/**
 * 権限エラー
 */
export class ForbiddenError extends Error {
  // ステータスコード
  public readonly status = 403
  // エラー名
  public readonly name = 'ForbiddenError'

  constructor(message = MESSAGE.error.forbidden) {
    super(message)
  }
}

import { MESSAGE } from '@/shared/constants/message'

/**
 * 認証エラー
 */
export class UnauthorizedError extends Error {
  // ステータスコード
  public readonly status = 401
  // エラー名
  public readonly name = 'Unauthorized'

  constructor(message = MESSAGE.error.unauthorized) {
    super(message)
  }
}

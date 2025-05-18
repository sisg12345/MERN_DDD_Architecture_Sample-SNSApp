import { MESSAGE } from '@/shared/constants/message'

/**
 * Not Found エラー
 */
export class NotFoundError extends Error {
  // ステータスコード
  public readonly status = 404
  // エラー名
  public readonly name = 'NotFoundError'

  constructor(message = MESSAGE.error.notFound) {
    super(message)
  }
}

import { MESSAGE } from '@/shared/constants/message'

/**
 * バリデーションエラー
 */
export class ValidationError extends Error {
  // ステータスコード
  public readonly status = 422
  // エラー名
  public readonly name = 'ValidationError'
  // エラー詳細
  public readonly details?: string[]

  constructor(details?: string[], message = MESSAGE.error.validation) {
    super(message)
    this.details = details
  }
}

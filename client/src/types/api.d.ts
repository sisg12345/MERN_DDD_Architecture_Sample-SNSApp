/* eslint-disable @typescript-eslint/no-empty-object-type */

// APIレスポンス
export interface ResponseResult<T = {}> {
  // ステータスコード
  status: number
  // メッセージ
  message?: string
  // データ
  data?: T
  // アクセストークン
  accessToken: string
  // リフレッシュトークン
  refreshToken: string
  // エラー
  errors?: Record<string, string>
}

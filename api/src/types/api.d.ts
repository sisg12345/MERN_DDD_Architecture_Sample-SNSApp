/* eslint-disable @typescript-eslint/no-empty-object-type */

// APIレスポンス
export interface ResponseResult<T = {}> {
  // ステータスコード
  status: number
  // メッセージ
  message: string
  // データ
  data?: T | null
  // アクセストークン
  accessToken?: string
  // リフレッシュトークン
  refreshToken?: string
  // エラー
  errors?: Record<string, string>
}

// ExpressのRequest型を拡張
declare module 'express' {
  // リクエストに認証ユーザーIDを追加
  export interface Request {
    // ユーザーID
    userId?: string
  }
}

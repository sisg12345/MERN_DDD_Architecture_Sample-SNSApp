import axios from 'axios'
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import { AppStorage } from '@/utils/storage'
import type { ResponseResult } from '@/types'

/**
 * axios初期設定
 */
const _axios: AxiosInstance = axios.create({
  // ベースURL
  baseURL: import.meta.env.VITE_API_BASE_URL,
  // タイムアウト
  timeout: 5000,
  // ヘッダー
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * リクエスト共通処理
 */
_axios.interceptors.request.use(
  (request: InternalAxiosRequestConfig) => {
    // ローカルストレージから認証情報を取得
    const auth = new AppStorage<string>('persist:sns').getItem('auth')
    // NOTE: Redux対応、パースしてオブジェクトに変換
    const parsedAuth: { accessToken: string } = JSON.parse(auth || '{}')
    // アクセストークンを取得
    const accessToken = parsedAuth.accessToken

    // アクセストークンをリクエストヘッダーに追加
    if (accessToken) {
      request.headers.Authorization = `Bearer ${accessToken}`
    }

    // リクエストの型を明示
    return request
  },
  async (error: AxiosError) => {
    return Promise.reject(error)
  },
)
// AxiosRequestConfigを拡張
interface OriginalConfig extends AxiosRequestConfig {
  // リクエストの再試行フラグ
  _retry?: boolean
}

/**
 * レスポンス共通処理
 */
_axios.interceptors.response.use(
  (response: AxiosResponse) => {
    // レスポンスの型を明示
    return response
  },
  async (error: AxiosError) => {
    // エラー発生時の設定情報
    const originalConfig: OriginalConfig | undefined = error.config

    // リフレッシュトークンの認証に失敗
    if (error.response?.status === 401 && originalConfig?.url === 'api/auth/refresh_token') {
      // ストレージをクリア (redux-persist情報をクリア)
      localStorage.clear()
      // ログイン画面に遷移
      window.location.href = '/login'

      return Promise.reject(error)
    }

    if (error.response?.status === 401 && originalConfig && !originalConfig._retry) {
      // リクエストの再試行済み
      originalConfig._retry = true

      // ローカルストレージから認証情報を取得
      const auth = new AppStorage<string>('persist:sns').getItem('auth')
      // NOTE: Redux対応、パースしてオブジェクトに変換
      const parsedAuth: { refreshToken: string } = JSON.parse(auth || '{}')
      // リフレッシュトークンを取得
      const refreshToken = parsedAuth.refreshToken

      return await _axios
        .post('api/auth/refresh_token', { refreshToken })
        .then((response: AxiosResponse<ResponseResult>) => {
          if (originalConfig.headers) {
            // アクセストークン
            const accessToken = response.data.accessToken
            // リクエストヘッダーにアクセストークンを追加
            originalConfig.headers.Authorization = `Bearer ${accessToken}`
            // ストレージにアクセストークンを保存
            const storage = new AppStorage('persist:sns')
            storage.setItem('auth', JSON.stringify({ ...parsedAuth, accessToken }))
            storage.save()
          }

          return _axios(originalConfig)
        })
    }

    switch (error.response?.status) {
      // 認証エラー
      case 404:
        window.location.href = '/not-found'
        break
    }

    // 認証エラー以外
    return Promise.reject(error)
  },
)

export default _axios

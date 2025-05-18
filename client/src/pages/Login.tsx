import SignInForm from '@/components/organisms/form/SignInForm'
import LoginPageTemplate from '@/components/templates/LoginPageTemplate'
import axios from '@/plugin/axios'
import type { ResponseResult } from '@/types'
import type { AxiosError, AxiosResponse } from 'axios'
import type { AuthState } from '@/stores/slices/authSlice'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/hooks/useRedux'
import { login } from '@/stores/slices/authSlice'

/**
 * ログインページ
 */
export default function Login() {
  // navigateフック
  const navigate = useNavigate()
  // Reduxのdispatchフック
  const dispatch = useAppDispatch()
  // エラーメッセージの状態管理
  const [errorMessage, setErrorMessage] = useState<string>('')

  /**
   * ログイン処理
   *
   * @param email メールアドレス
   * @param password パスワード
   */
  const handleLogin = async (email: string, password: string) => {
    await axios
      .post('api/auth/login', {
        email,
        password,
      })
      .then((response: AxiosResponse<ResponseResult<AuthState>>) => {
        if (response.data.data) {
          // ログインユーザー
          const { userId, username } = response.data.data
          // アクセストークン
          const accessToken = response.data.accessToken
          // リフレッシュトークン
          const refreshToken = response.data.refreshToken
          // Reduxのストアにユーザー情報を保存
          dispatch(login({ userId, username, accessToken, refreshToken }))
          // ログイン成功時にリダイレクト
          navigate('/')
        }
      })
      .catch((error: AxiosError<ResponseResult>) => {
        if (error.status === 401) {
          setErrorMessage(error.response?.data.message ?? '')
        }
      })
  }

  /**
   * ログインフォーム
   *
   * @param formLayout フォームのレイアウト
   */
  const signInForm = (formLayout: string) => (
    <SignInForm className={formLayout} errorMessage={errorMessage} onLogin={handleLogin} />
  )

  return <LoginPageTemplate formRender={signInForm} />
}

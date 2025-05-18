import SignUpForm from '@/components/organisms/form/SiginUpForm'
import LoginPageTemplate from '@/components/templates/LoginPageTemplate'
import axios from '@/plugin/axios'
import type { ResponseResult } from '@/types'
import type { AxiosError, AxiosResponse } from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * 新規登録ページ
 */
export default function Register() {
  // navigateフック
  const navigate = useNavigate()
  // エラーの状態管理
  const [errors, setErrors] = useState<Record<string, string> | null>(null)

  /**
   * ユーザーを新規登録
   *
   * @param username ユーザー名
   * @param email メールアドレス
   * @param password パスワード
   *
   */
  const handleRegister = async (username: string, email: string, password: string) => {
    await axios
      .post('api/auth/register', {
        username,
        email,
        password,
      })
      .then((response: AxiosResponse) => {
        if (response.status === 201) {
          navigate('/login')
        }
      })
      .catch((error: AxiosError<ResponseResult>) => {
        if (error.status === 409) {
          // ユーザー名またはメールアドレスが既に存在する場合
          setErrors(error.response?.data.errors ?? null)
        }
      })
  }

  /**
   * 新規浪録フォーム
   *
   * @param formLayout フォームのレイアウト
   */
  const signUpForm = (formLayout: string) => (
    <SignUpForm className={formLayout} onRegister={handleRegister} errors={errors} />
  )

  return <LoginPageTemplate formRender={signUpForm} />
}

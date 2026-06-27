import UserProfileEdit from '@/components/organisms/profile/UserProfileEdit'
import UserProfileTemplate from '@/components/templates/UserProfileTemplate'
import { useAppSelector } from '@/hooks/useRedux'
import axios from '@/plugin/axios'
import type { ResponseResult, User } from '@/types'
import type { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

/**
 * プロフィール編集ページ
 */
export default function ProfileEdit() {
  // URLパラメーターからユーザーIDを取得
  const { id = '' } = useParams()
  // navigateフック
  const navigate = useNavigate()
  // ユーザー情報の状態管理
  const [user, setUser] = useState<User>({} as User)
  // エラーの状態管理
  const [errors, setErrors] = useState<Record<string, string> | null>(null)
  // 登録成功の状態管理
  const [isSuccess, setIsSuccess] = useState(false)
  // ログインユーザーID情報
  const loginUserId = useAppSelector((state) => state.auth.userId)

  /**
   * ユーザープロフィール更新
   *
   * @param userId ユーザーID
   */
  const handleUpdateProfile = async (user: User): Promise<void> => {
    setIsSuccess(false)

    await axios
      .put(`api/users/${id}`, user)
      .then((response) => {
        if (response.status === 200) {
          setIsSuccess(true)
          setErrors(null)
        }
      })
      .catch((error) => {
        if (error.status === 409) {
          // 変更しようとするユーザー名またはメールアドレスが既に存在する場合
          setErrors(error.response?.data.errors ?? null)
        }
      })
  }

  useEffect(() => {
    /**
     * ユーザー情報を取得
     *
     * @param userId ユーザーID
     */
    const fetchUser = async (userId: string): Promise<void> => {
      await axios
        .get(`api/users/${userId}`)
        .then((response: AxiosResponse<ResponseResult<User>>) => {
          if (response.data.data) {
            setUser(response.data.data)
          }
        })
        .catch((error) => {
          // NOTE: zodのリクエストバリデーションエラーで400エラーが返却返却される
          // その場合は、ユーザ＝が存在しない扱いにして404ページに遷移する
          if (error.response.status === 400) {
            navigate('/not-found')
          }
        })
    }

    if (id) {
      // ログインユーザー以外のプロフィール編集ページにアクセスした場合は、404ページに遷移する
      if (id !== loginUserId) {
        navigate('/not-found')
      } else {
        fetchUser(id)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const userProfileEdit = () => (
    <UserProfileEdit
      user={user}
      isSuccess={isSuccess}
      errors={errors}
      onUpdateProfile={handleUpdateProfile}
    />
  )

  return <UserProfileTemplate renderContents={userProfileEdit()} />
}

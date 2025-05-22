import PageContainer from '@/components/layout/page/PageContainer'
import UserProfile from '@/components/organisms/profile/UserProfile'
import Sidebar from '@/components/organisms/sidebar/Sidebar'
import { useAppDispatch } from '@/hooks/useRedux'
import axios from '@/plugin/axios'
import { logout } from '@/stores/slices/authSlice'
import type { ResponseResult, User } from '@/types'
import type { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

/**
 * プロフィールページ
 */
export default function Profile() {
  // URLパラメータからIDを取得
  const { id = '' } = useParams()
  // ユーザー情報の状態管理
  const [user, setUser] = useState<User>({} as User)
  // Reduxのdispatchフック
  const dispatch = useAppDispatch()
  // navigateフック
  const navigate = useNavigate()

  /**
   * ユーザーアカウント削除
   *
   * @param userId ユーザーID
   */
  const handleDeleteAccount = async (userId: string): Promise<void> => {
    await axios.delete(`api/users/${userId}`).then((response) => {
      if (response.status === 200) {
        // ユーザー削除成功時にログアウト
        dispatch(logout())
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
      fetchUser(id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <PageContainer>
      {/* サイドバー */}
      <Sidebar />
      {/* ユーザープロフィール */}
      <UserProfile profileUserId={id} user={user} onDeleteAccount={handleDeleteAccount} />
    </PageContainer>
  )
}

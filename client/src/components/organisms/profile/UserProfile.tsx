import TimeLine from '@/components/organisms/timeline/TimeLine'
import ProfileRightBar from '@/components/organisms/rightBar/ProfileRightBar'
import UserProfileInfo from './UserProfileInfo'
import Button from '@/components/atoms/button/Button'
import type { User } from '@/types'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import { logout } from '@/stores/slices/authSlice'

interface UserProfileProps {
  profileUserId: string
  user: User
  onDeleteAccount: (userId: string) => Promise<void>
}

/**
 * ユーザープロフィール
 */
export default function UserProfile({ profileUserId, user, onDeleteAccount }: UserProfileProps) {
  // ログインユーザーID情報
  const loginUserId = useAppSelector((state) => state.auth.userId)
  // ログインユーザーかどうか
  const isLoginUser = profileUserId === loginUserId
  // Reduxのdispatchフック
  const dispatch = useAppDispatch()

  return (
    <main className="p-4 w-full">
      {/* ユーザープロフィール情報 */}
      <UserProfileInfo
        username={user.username}
        description={user.description}
        backgroundSrc={user.profilePicture}
        userAccountSrc={user.profilePicture}
      />
      {!isLoginUser && (
        <div className="flex justify-center gap-2">
          <Button>フォロー</Button>
          <Button>フォロー解除</Button>
        </div>
      )}
      {isLoginUser && (
        <div className="flex justify-center gap-2">
          <Button onClick={() => dispatch(logout())}>ログアウト</Button>
          <Button variant="danger" onClick={() => onDeleteAccount(profileUserId)}>
            アカウント削除
          </Button>
        </div>
      )}
      <div className="flex justify-center">
        {/* タイムライン */}
        <TimeLine isLoginUser={isLoginUser} userId={profileUserId} />
        {/* サイドバー右 */}
        <ProfileRightBar user={{ from: user.from ?? '', city: user.city ?? '' }} />
      </div>
    </main>
  )
}

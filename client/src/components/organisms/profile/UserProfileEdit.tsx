import type { User } from '@/types'
import UserProfileInfo from '@/components/organisms/form/UserProfileForm'

interface UserProfileEditProps {
  user: User
  errors?: Record<string, string> | null
  isSuccess: boolean
  onUpdateProfile: (user: User) => Promise<void>
}

/**
 * ユーザープロフィール編集
 */
export default function UserProfileEdit({
  user,
  isSuccess,
  errors,
  onUpdateProfile,
}: UserProfileEditProps) {
  return (
    <main className="p-4 w-full">
      {/* ユーザープロフィール情報 */}
      <UserProfileInfo
        profileUserId={user._id}
        user={user}
        isSuccess={isSuccess}
        errors={errors}
        onUpdateProfile={onUpdateProfile}
      />
    </main>
  )
}

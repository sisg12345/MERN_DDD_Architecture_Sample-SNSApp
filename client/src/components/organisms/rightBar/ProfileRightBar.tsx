import SectionTitle from '@/components/atoms/title/SectionTitle'
import UsersSection from '@/components/organisms/section/UsersSection'
import type { UserImageInfo } from '@/components/organisms/section/UsersSection'
import type { User } from '@/types/data'

interface ProfileRightBarProps {
  user: {
    from: string
    city: string
    followings: User['followings']
  }
}

/**
 * プロフィールページの右サイドバー
 */
export default function ProfileRightBar({ user }: ProfileRightBarProps) {
  // ユーザー一覧
  const users: UserImageInfo[] = user.followings.map(({ id, profilePicture, username }) => ({
    id: id,
    src: profilePicture,
    alt: username,
    label: username,
  }))

  return (
    <aside className="min-w-48 p-2">
      {/* ユーザー一覧 */}
      <UsersSection
        title="フォロワー"
        users={users}
        className="p-2 mt-2 shadow rounded max-h-[252px] overflow-y-auto"
      />
    </aside>
  )
}

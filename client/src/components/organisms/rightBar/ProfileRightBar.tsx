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
      <div className="p-2 mt-2 shadow rounded">
        <SectionTitle title="ユーザー情報" className="px-2" />
        <div className="px-4 text-sm font-semibold">
          <div>
            出身:<span className="ml-2">{user.from}</span>
          </div>
          <div>
            {' '}
            都市:<span className="ml-2">{user.city}</span>
          </div>
        </div>
      </div>
      {/* ユーザー一覧 */}
      <UsersSection
        title="フォロワー"
        users={users}
        className="p-2 mt-2 shadow rounded max-h-[252px] overflow-y-auto"
      />
    </aside>
  )
}

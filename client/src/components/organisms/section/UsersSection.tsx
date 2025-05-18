import SectionTitle from '@/components/atoms/title/SectionTitle'
import ItemHoverEffect from '@/components/layout/hover/ItemHoverEffect'
import CircleImageWithLabel from '@/components/molecules/image/CircleImageWithLabel'
import UserOnlineStatusImage from '@/components/molecules/image/UserOnlineStatusImage'
import { useNavigate } from 'react-router-dom'

export interface UserImageInfo {
  id: string
  src: string
  alt?: string
  label: string
}

interface UsersSectionProps {
  title?: string
  users: UserImageInfo[]
  className?: string
  showOnlineStatus?: boolean
}

/**
 * ユーザー一覧セクション
 */
export default function UsersSection({
  title,
  users,
  className = '',
  showOnlineStatus = false,
}: UsersSectionProps) {
  // navigateフック
  const navigate = useNavigate()

  /**
   * ユーザー画像をクリックしたときの処理
   *
   * @param id ユーザーID
   */
  const handleOnClick = (id: string) => {
    navigate(`/profiles/${id}`)
  }
  return (
    <div className={className}>
      {/* セクションタイトル */}
      {title && <SectionTitle title={title} className="px-2" />}
      {/* ユーザー一覧 */}
      {users.map((user) => (
        <ItemHoverEffect key={user.id}>
          {showOnlineStatus ? (
            // ユーザーオンラインステータス付きす画像
            <UserOnlineStatusImage
              src={user.src}
              alt={user.alt}
              label={user.label}
              className="px-2 my-1"
              isOnline={true}
              onClick={() => handleOnClick(user.id)}
            />
          ) : (
            // ユーザー画像
            <CircleImageWithLabel
              src={user.src}
              alt={user.alt}
              label={user.label}
              className="px-2 my-1"
              onClick={() => handleOnClick(user.id)}
            />
          )}
        </ItemHoverEffect>
      ))}
    </div>
  )
}

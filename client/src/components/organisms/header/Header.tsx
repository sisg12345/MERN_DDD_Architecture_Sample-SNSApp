import SearchInput from '@/components/molecules/input/SearchInput'
import CircleImage from '@/components/atoms/image/CircleImage'
import NotificationWithCount from '@/components/molecules/icon/NotificationWithCount'
import ChatNotificationWithCount from '@/components/molecules/icon/ChatNotificationWithCount'
import { Link } from 'react-router-dom'
import { useAppSelector } from '@/hooks/useRedux'

/**
 * ヘッダー
 */
export default function Header() {
  // ReduxからユーザーIDを取得
  const userId = useAppSelector((state) => state.auth.userId)

  return (
    <header className="flex items-center sticky top-0 w-full h-14 bg-rose-400 text-white z-50">
      <Link to="/" className="grow-[3] ml-5 text-2xl font-bold cursor-pointer">
        SNS
      </Link>
      {/* 検索欄 */}
      <SearchInput className="grow-[5]" onSearch={() => {}} />
      <div className="flex justify-around grow-[4]">
        <div className="flex items-center gap-2">
          {/* チャット通知 */}
          <ChatNotificationWithCount count={99} />
          {/* 通知 */}
          <NotificationWithCount count={99} />
          {/* ユーザーアカウント */}
          <Link to={`profiles/${userId}`}>
            <CircleImage src="/icon_user.png" alt="user account" className="cursor-pointer" />
          </Link>
        </div>
      </div>
    </header>
  )
}

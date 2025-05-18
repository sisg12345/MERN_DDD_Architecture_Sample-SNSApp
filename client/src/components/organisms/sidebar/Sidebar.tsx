import {
  BookmarkIcon,
  HomeIcon,
  NotificationsIcon,
  PersonIcon,
  SearchIcon,
  SettingIcon,
} from '@/components/atoms/icon/Icon'
import Separator from '@/components/atoms/separator/Separator'
import ItemHoverEffect from '@/components/layout/hover/ItemHoverEffect'
import type { JSX } from 'react'
import UsersSection from '@/components/organisms/section/UsersSection'
import type { UserImageInfo } from '@/components/organisms/section/UsersSection'
import { Link } from 'react-router-dom'

type Naves = {
  icon: JSX.Element
  label: string
  to: string
}[]

/**
 * サイドバー
 */
export default function Sidebar() {
  // ナビゲーション
  const naves: Naves = [
    {
      icon: <HomeIcon />,
      label: 'ホーム',
      to: '/',
    },
    {
      icon: <SearchIcon />,
      label: '検索',
      to: '/coming-soon',
    },
    {
      icon: <NotificationsIcon />,
      label: '通知',
      to: '/coming-soon',
    },
    {
      icon: <BookmarkIcon />,
      label: 'ブックマーク',
      to: '/coming-soon',
    },
    {
      icon: <PersonIcon />,
      label: 'プロフィール',
      to: '/coming-soon',
    },
    {
      icon: <SettingIcon />,
      label: '設定',
      to: '/coming-soon',
    },
  ]
  // ユーザー一覧
  const users: UserImageInfo[] = [
    {
      id: '1',
      src: '/icon_user.png',
      alt: 'user 1',
      label: 'user 1',
    },
    {
      id: '2',
      src: '/icon_user.png',
      alt: 'user 2',
      label: 'user 2',
    },
    {
      id: '3',
      src: '/icon_user.png',
      alt: 'user 3',
      label: 'user 3',
    },
  ]

  return (
    <aside className="min-w-48 p-2">
      <nav>
        <ul>
          {naves.map((nav, index) => (
            <li key={index}>
              <Link to={nav.to}>
                <ItemHoverEffect className="flex items-center p-2 my-1">
                  {nav.icon}
                  <span className="ml-2">{nav.label}</span>
                </ItemHoverEffect>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <Separator />
      {/* ユーザー一覧 */}
      <UsersSection title="おすすめフレンド" users={users} />
    </aside>
  )
}

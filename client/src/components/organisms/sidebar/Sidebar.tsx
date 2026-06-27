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
import { useEffect, useState } from 'react'
import UsersSection from '@/components/organisms/section/UsersSection'
import type { UserImageInfo } from '@/components/organisms/section/UsersSection'
import { Link, useNavigate } from 'react-router-dom'
import axios from '@/plugin/axios'
import type { ResponseResult } from '@/types'
import type { AxiosResponse } from 'axios'
import { useAppSelector } from '@/hooks/useRedux'

type Naves = {
  icon: JSX.Element
  label: string
  to: string
  onClick?: () => void
}[]

/**
 * サイドバー
 */
export default function Sidebar() {
  // navigateフック
  const navigate = useNavigate()
  // ログインユーザーIDを取得
  const loginUserId = useAppSelector((state) => state.auth.userId)

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
      to: '#',
      onClick: () => {
        if (loginUserId) {
          navigate(`/profiles/${loginUserId}/edit`)
        } else {
          navigate('/login')
        }
      },
    },
    {
      icon: <SettingIcon />,
      label: '設定',
      to: '/coming-soon',
    },
  ]
  // ユーザー一覧の状態管理
  const [users, setUsers] = useState<UserImageInfo[]>([])

  useEffect(() => {
    /**
     * おすすめユーザーを取得
     */
    const fetchRecommendUsers = async (): Promise<void> => {
      await axios
        .get('/api/users/recommends/all')
        .then(
          (
            response: AxiosResponse<
              ResponseResult<{ userId: string; username: string; profilePicture: string }[]>
            >,
          ) => {
            const result: UserImageInfo[] = []
            response.data.data?.forEach((user) => {
              result.push({
                id: user.userId,
                src: user.profilePicture,
                alt: user.username,
                label: user.username,
              })
            })

            setUsers(result)
          },
        )
    }

    fetchRecommendUsers()
  }, [])

  return (
    <aside className="min-w-48 p-2">
      <nav>
        <ul>
          {naves.map((nav, index) => (
            <li key={index} onClick={nav.onClick}>
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
      <UsersSection title="おすすめフォロワー" users={users} />
    </aside>
  )
}

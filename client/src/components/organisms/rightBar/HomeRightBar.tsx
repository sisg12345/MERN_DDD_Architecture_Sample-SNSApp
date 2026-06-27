import { EventIcon } from '@/components/atoms/icon/Icon'
import RoundedImage from '@/components/atoms/image/RoundedImage'
import SectionTitle from '@/components/atoms/title/SectionTitle'
import { Fragment } from 'react/jsx-runtime'
import UsersSection from '@/components/organisms/section/UsersSection'
import type { UserImageInfo } from '@/components/organisms/section/UsersSection'

type Promotions = {
  id: string
  src: string
  alt?: string
  title: string
}[]

/**
 * ホームページの右サイドバー
 */
export default function HomeRightBar() {
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
    {
      id: '4',
      src: '/icon_user.png',
      alt: 'user 4',
      label: 'user 4',
    },
    {
      id: '5',
      src: '/icon_user.png',
      alt: 'user 5',
      label: 'user 5',
    },
    {
      id: '6',
      src: '/icon_user.png',
      alt: 'user 6',
      label: 'user 6',
    },
    {
      id: '7',
      src: '/icon_user.png',
      alt: 'user 7',
      label: 'user 7',
    },
    {
      id: '8',
      src: '/icon_user.png',
      alt: 'user 8',
      label: 'user 8',
    },
    {
      id: '9',
      src: '/icon_user.png',
      alt: 'user 9',
      label: 'user 9',
    },
    {
      id: '10',
      src: '/icon_user.png',
      alt: 'user 10',
      label: 'user 10',
    },
  ]
  // プロモーション広告一覧
  const promotions: Promotions = [
    {
      id: '1',
      src: '//picsum.photos/1000/500',
      alt: 'promotion 1',
      title: 'プロモーション 1',
    },
    {
      id: '2',
      src: '//picsum.photos/1000/500',
      alt: 'promotion 2',
      title: 'プロモーション 2',
    },
    {
      id: '3',
      src: '//picsum.photos/1000/500',
      alt: 'promotion 3',
      title: 'プロモーション 3',
    },
  ]

  return (
    <aside className="min-w-96 p-2">
      <div className="p-2 mt-2 shadow rounded">
        <h2 className="flex items-center gap-2">
          <EventIcon className="text-yellow-400" />
          <span className="font-bold">イベント開催中</span>
        </h2>
        <RoundedImage src="//picsum.photos/1000/500" alt="event info" />
      </div>
      {/* ユーザー一覧 */}
      <UsersSection
        title="オンラインのフォロワー"
        className="p-2 mt-2 shadow rounded max-h-[252px] overflow-y-auto"
        users={users}
        showOnlineStatus={true}
      />
      <div className="p-2 mt-2 shadow rounded">
        <SectionTitle title="プロモーション広告" className="px-2" />
        <h2 className="text-sm font-bold"></h2>
        {promotions.map((promotion) => (
          <Fragment key={promotion.id}>
            <span className="text-sm p-2">{promotion.title}</span>
            <RoundedImage src={promotion.src} alt={promotion.alt} className="my-1 mb-5" />
          </Fragment>
        ))}
      </div>
    </aside>
  )
}

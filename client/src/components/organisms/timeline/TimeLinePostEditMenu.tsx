import { DeleteIcon, EditIcon, MoreVertIcon, ReportIcon } from '@/components/atoms/icon/Icon'
import ItemHoverEffect from '@/components/layout/hover/ItemHoverEffect'
import { useAppSelector } from '@/hooks/useRedux'
import { useEffect, useRef, useState } from 'react'
import type { JSX } from 'react'

interface TimeLinePostEditMenuProps {
  postId: string
  postUserId: string
  onDelete: (postId: string) => Promise<void>
  onEdit: (postId: string) => void
}

interface Menu {
  id: string
  label: string
  show: boolean
  icon: JSX.Element
  onClick: (postId: string) => void | Promise<void>
}

/**
 * タイムラインの投稿編集メニュー
 */
export default function TimeLinePostEditMenu({
  postId,
  postUserId,
  onEdit,
  onDelete,
}: TimeLinePostEditMenuProps) {
  // ユーザーID
  const userId = useAppSelector((state) => state.auth.userId)
  // 投稿編集メニューの表示状態管理
  const [show, setShow] = useState<boolean>(false)
  // メニューの参照
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    /**
     * クリックイベントハンドラー
     *
     * @param e マウスイベント
     */
    const handleClick = (e: MouseEvent) => {
      // メニュー外をクリックした場合のみ閉じる
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShow(false)
      }
    }
    document.addEventListener('mousedown', handleClick)

    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [show])

  // メニュー
  const menus: Menu[] = [
    {
      id: 'edit',
      label: '編集',
      show: userId === postUserId,
      icon: <EditIcon />,
      onClick: onEdit,
    },
    {
      id: 'delete',
      label: '削除',
      show: userId === postUserId,
      icon: <DeleteIcon />,
      onClick: onDelete,
    },
    {
      id: 'report',
      label: '通報',
      show: true,
      icon: <ReportIcon />,
      onClick: () => {
        console.log('report function  will be implemented...')
      },
    },
  ]

  return (
    <div className="relative" ref={menuRef}>
      <MoreVertIcon onClick={() => setShow(!show)} />
      {show && (
        <div className="absolute left-0 z-10 mt-2 py-1 w-28 origin-top-right rounded bg-rose-50 shadow-lg ring-1 ring-black/5 focus:outline-hidden">
          <ul>
            {menus.map((menu) => (
              <ItemHoverEffect key={menu.id}>
                {menu.show && (
                  <li
                    className="px-4 py-1 text-xs font-bold"
                    onClick={() => {
                      menu.onClick(postId)
                      setShow(false)
                    }}
                  >
                    <span className="inline-flex items-center gap-1">
                      {menu.icon}
                      {menu.label}
                    </span>
                  </li>
                )}
              </ItemHoverEffect>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

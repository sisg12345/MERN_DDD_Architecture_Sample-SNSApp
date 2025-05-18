import Button from '@/components/atoms/button/Button'
import { EmojiEmotionsIcon, ImageIcon, LocationOnIcon } from '@/components/atoms/icon/Icon'
import CircleImage from '@/components/atoms/image/CircleImage'
import TextArea from '@/components/atoms/input/TextArea'
import Separator from '@/components/atoms/separator/Separator'
import ItemHoverEffect from '@/components/layout/hover/ItemHoverEffect'
import type { Post } from '@/types'
import { useState, type FormEvent } from 'react'

interface TimeLinePostFormProps {
  post?: Post
  onPost?: (message: string) => void
  onCancel?: () => void
}

/**
 * タイムライン投稿フォーム
 */
export default function TimeLinePostForm({ post, onPost, onCancel }: TimeLinePostFormProps) {
  // 投稿メッセージの状態管理
  const [message, setMessage] = useState<string>(post?.message ?? '')

  /**
   * 投稿の送信
   *
   * @param e フォームイベント
   */
  const handlePost = (e: FormEvent) => {
    e.preventDefault()

    if (onPost) {
      onPost(message)
      // 投稿後にテキストエリアを空にする
      setMessage('')
    }
  }

  return (
    <ItemHoverEffect>
      <form onSubmit={handlePost} className="p-2 rounded shadow">
        <div className="flex items-top">
          {/* ユーザーアカウント */}
          <CircleImage src="/icon_user.png" alt="post user account" />
          {/* テキストエリア */}
          <TextArea
            className="px-2 mx-1"
            maxLength={500}
            placeholder="What's on your mind?"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <Separator className="my-4" />
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            {/* 画像アイコン */}
            <ImageIcon className="text-red-400 hover:text-red-300" />
            {/* 位置情報アイコン */}
            <LocationOnIcon className="text-indigo-400 hover:text-indigo-300" />
            {/* 絵文字アイコン */}
            <EmojiEmotionsIcon className="text-yellow-400 hover:text-yellow-300" />
          </div>
          <div className="flex items-center gap-2">
            {onCancel && (
              <Button type="button" variant="secondary" onClick={onCancel}>
                キャンセル
              </Button>
            )}
            <Button type="submit" variant="primary" disabled={message.trim().length === 0}>
              ポストする
            </Button>
          </div>
        </div>
      </form>
    </ItemHoverEffect>
  )
}

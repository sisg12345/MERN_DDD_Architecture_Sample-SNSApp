import RoundedImage from '@/components/atoms/image/RoundedImage'
import CommentButton from '@/components/molecules/button/CommentButton'
import LikeWithCount from '@/components/molecules/icon/LikeWithCount'
import CircleImageWithLabel from '@/components/molecules/image/CircleImageWithLabel'
import { Link } from 'react-router-dom'
import type { Post } from '@/types'
import TimeLinePostEditMenu from './TimeLinePostEditMenu'
import { Fragment } from 'react/jsx-runtime'

interface TimeLinePost {
  post: Post
  onDelete: (postId: string) => Promise<void>
  onEdit: (postId: string) => void
  onAddLike: (postId: string) => Promise<void>
  onDeleteLike: (postId: string) => Promise<void>
}

/**
 * タイムラインの投稿
 */
export default function TimeLinePost({
  post,
  onEdit,
  onDelete,
  onAddLike,
  onDeleteLike,
}: TimeLinePost) {
  return (
    <div className="flex flex-col gap-2 p-2 mt-4 rounded shadow">
      {/* 投稿のヘッダー */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-1">
          {/* ユーザーアカウント */}
          <Link to={`/profiles/${post.userId}`} className="cursor-pointer">
            <CircleImageWithLabel
              src={post.profilePicture}
              alt={post.userId}
              label={post.username}
              className="px-2 my-1"
            >
              <span className="text-sm text-rose-300">
                {new Date(post.createdAt).toLocaleString()}
              </span>
            </CircleImageWithLabel>
          </Link>
        </div>
        {/* 投稿編集メニュー */}
        <TimeLinePostEditMenu
          postId={post._id}
          postUserId={post.userId}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
      {/* 投稿のボディー */}
      <div className="px-4">
        <span className="text-sm">
          {post.message
            ? post.message.split('\n').map((line, index, array) => (
                <Fragment key={index}>
                  {line}
                  {index < array.length - 1 && <br />}
                </Fragment>
              ))
            : null}
        </span>
        {/* 投稿画像 */}
        {post.image && (
          <div className="flex flex-wrap gap-2 mt-2">
            <RoundedImage src={post.image} alt="post image" />
          </div>
        )}
      </div>
      {/* 投稿のフッター */}
      <div className="flex items-center justify-between">
        {/* いいねアイコン */}
        <LikeWithCount
          count={post.likes}
          isLikedPost={post.isLiked}
          onAddLike={() => onAddLike(post._id)}
          onDeleteLike={() => onDeleteLike(post._id)}
        />
        {/* コメント追加ボタン */}
        <CommentButton count={1} onClick={() => {}} />
      </div>
    </div>
  )
}

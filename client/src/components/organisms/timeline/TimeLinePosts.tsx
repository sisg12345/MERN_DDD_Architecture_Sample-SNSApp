import type { Post } from '@/types'
import TimeLinePost from './TimeLinePost'
import { Fragment, useState } from 'react'
import TimeLinePostForm from './TimeLinePostForm'

interface TimeLinePostsProps {
  posts: Post[]
  onUpdate: (postId: string, message: string) => Promise<void>
  onDelete: (postId: string) => Promise<void>
  onAddLike: (postId: string) => Promise<void>
  onDeleteLike: (postId: string) => Promise<void>
}

/**
 * タイムライン投稿一覧
 */
export default function TimeLinePosts({
  posts,
  onUpdate,
  onDelete,
  onAddLike,
  onDeleteLike,
}: TimeLinePostsProps) {
  // 編集中の投稿IDの状態管理
  const [editPostId, setEditPostId] = useState<string | null>(null)

  return (
    <>
      {posts.map((post) => (
        <Fragment key={post._id}>
          {post._id === editPostId ? (
            // 投稿フォーム
            <TimeLinePostForm
              post={post}
              onPost={(message: string) => {
                onUpdate(post._id, message)
                setEditPostId(null)
              }}
              onCancel={() => setEditPostId(null)}
            />
          ) : (
            // 投稿タイムライン
            <TimeLinePost
              post={post}
              onEdit={(postId: string) => setEditPostId(postId)}
              onDelete={onDelete}
              onAddLike={onAddLike}
              onDeleteLike={onDeleteLike}
            />
          )}
        </Fragment>
      ))}
    </>
  )
}

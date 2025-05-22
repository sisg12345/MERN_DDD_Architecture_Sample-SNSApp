import TimeLinePostForm from './TimeLinePostForm'
import TimeLinePosts from './TimeLinePosts'
import axios from '@/plugin/axios'
import { useEffect, useState } from 'react'
import type { Post } from '@/types'

interface TimeLineProps {
  isLoginUser: boolean
  userId?: string
}

/**
 * タイムライン
 */
export default function TimeLine({ isLoginUser, userId }: TimeLineProps) {
  // 投稿の状態管理
  const [posts, setPosts] = useState<Post[]>([])
  // タイムライン更新の状態管理
  const [updateTimeLine, setUpdateTimeLine] = useState<boolean>(false)

  /**
   * 投稿を送信
   *
   * @param message 投稿メッセージ
   */
  const handlePost = async (message: string): Promise<void> => {
    await axios.post('api/posts/', { message }).then((response) => {
      if (response.status === 201) {
        // 投稿成功時にタイムラインを更新
        setUpdateTimeLine(!updateTimeLine)
      }
    })
  }

  /**
   * 投稿を更新
   *
   * @param postId 投稿ID
   */
  const handleUpdatePost = async (postId: string, message: string): Promise<void> => {
    await axios.put(`api/posts/${postId}`, { message }).then((response) => {
      if (response.status === 200) {
        // 投稿成功時にタイムラインを更新
        setUpdateTimeLine(!updateTimeLine)
      }
    })
  }

  /**
   * 投稿を削除
   *
   * @param postId 投稿ID
   */
  const handleDeletePost = async (postId: string): Promise<void> => {
    await axios.delete(`api/posts/${postId}`).then((response) => {
      if (response.status === 200) {
        // 投稿成功時にタイムラインを更新
        setUpdateTimeLine(!updateTimeLine)
      }
    })
  }

  /**
   * いいねを追加
   *
   * @param postId 投稿ID
   */
  const handleAddLike = async (postId: string): Promise<void> => {
    await axios.post(`api/posts/${postId}/like`).then((response) => {
      if (response.status === 201) {
        // 投稿成功時にタイムラインを更新
        setUpdateTimeLine(!updateTimeLine)
      }
    })
  }

  /**
   * いいねを削除
   *
   * @param postId 投稿ID
   */
  const handleDeleteLike = async (postId: string): Promise<void> => {
    await axios.delete(`api/posts/${postId}/unlike`).then((response) => {
      if (response.status === 200) {
        // 投稿成功時にタイムラインを更新
        setUpdateTimeLine(!updateTimeLine)
      }
    })
  }

  useEffect(() => {
    /**
     * 投稿を取得 (ログインユーザー)
     */
    const fetchPostByLoginUser = async () => {
      await axios.get('api/posts/timelines/all').then(async (response) => {
        setPosts(response.data.data ?? [])
        // タイムライン更新済み
        setUpdateTimeLine(false)
      })
    }

    /**
     * 投稿を取得 (一般ユーザー)
     *
     * @param userId ユーザーID
     */
    const fetchPostByUser = async (userId: string) => {
      await axios.get(`api/posts/timeline/${userId}`).then(async (response) => {
        setPosts(response.data.data ?? [])
        // タイムライン更新済み
        setUpdateTimeLine(false)
      })
    }

    if (isLoginUser) {
      // ログインユーザーの投稿を取得
      fetchPostByLoginUser()
    } else if (userId) {
      // ユーザーの投稿を取得
      fetchPostByUser(userId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateTimeLine])

  return (
    <main className="p-4 w-full max-w-3xl">
      {/* 投稿フォーム */}
      {isLoginUser && <TimeLinePostForm onPost={handlePost} />}
      {/* 投稿一覧 */}
      <TimeLinePosts
        posts={posts}
        onUpdate={handleUpdatePost}
        onDelete={handleDeletePost}
        onAddLike={handleAddLike}
        onDeleteLike={handleDeleteLike}
      />
    </main>
  )
}

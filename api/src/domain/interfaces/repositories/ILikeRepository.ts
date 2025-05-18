import type { Like } from '@/types'

export interface ILikeRepository {
  /**
   * いいねを追加
   *
   * @param postId 投稿ID
   */
  addPostLike(postId: string, userId: string): Promise<void>

  /**
   * いいねを削除
   *
   * @param postId 投稿ID
   */
  deletePostLike(postId: string[]): Promise<void>

  /**
   * ユーザーと投稿IDでいいねを検索
   *
   * @param postId 投稿ID
   * @param userId ユーザーID
   * @returns Like | null
   */
  findLikeByUserAndPost(postId: string, userId: string): Promise<Like | null>
}

import type { LikeModel } from '@/infrastructure/database/models/like'

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
  findLikeByUserAndPost(postId: string, userId: string): Promise<LikeModel | null>

  /**
   * いいねの数が多いユーザーを取得（指定ユーザー以外、日付の新しい順）
   *
   * @param userId 除外するユーザーID
   * @param count 件数
   * @returns Like | null
   */
  findTopLikeUsers(userId: string, count: number): Promise<{ userId: string; postId: string }[]>
}

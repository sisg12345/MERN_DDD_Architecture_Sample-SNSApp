import type { PostModel } from '@/infrastructure/database/models/post'

export interface IPostRepository {
  /**
   * 投稿を取得
   *
   * @param postId 投稿ID
   */
  findPostById(postId: string): Promise<PostModel | null>

  /**
   * 投稿を取得
   *
   * @param userId ユーザーID
   */
  findPostsByUserId(userId: string): Promise<PostModel[]>

  /**
   * 複数のユーザーの投稿を取得
   *
   * @param userIds ユーザーIDの配列
   */
  findPostsByUserIds(userIds: string[]): Promise<PostModel[]>

  /**
   * 投稿を新規作成
   *
   * @param userId ユーザーID
   * @param message 投稿内容
   * @param image 投稿画像
   */
  createPost(userId: string, message: string, image: string): Promise<void>

  /**
   * 投稿を更新
   *
   * @param postId 投稿ID
   * @param message 投稿内容
   * @param image 投稿画像
   */
  updatePost(postId: string, message: string, image: string): Promise<void>

  /**
   * 投稿を削除
   *
   * @param postId 投稿ID
   */
  deletePost(postId: string): Promise<void>

  /**
   * ユーザーIDの投稿を削除
   *
   * @param postId 投稿ID
   */
  deletePostByUserId(userId: string): Promise<void>

  /**
   * 投稿にいいねを追加
   *
   * @param postId 投稿ID
   * @param userId ユーザーID
   */
  addPostLike(postId: string, userId: string): Promise<void>

  /**
   * 投稿のいいねを削除
   *
   * @param postId 投稿ID
   * @param userId ユーザーID
   */
  deletePostLike(postId: string, userId: string): Promise<void>

  /**
   * 投稿のいいねの数を更新
   *
   * @param postId 投稿ID
   * @param likeCount 増減数
   */
  updatePostLikes(postId: string, count: number): Promise<void>

  /**
   * 投稿のいいねを取得
   *
   * @param postId 投稿ID
   * @param userId ユーザーID
   */
  findPostLike(postId: string, userId: string): Promise<PostModel | null>
}

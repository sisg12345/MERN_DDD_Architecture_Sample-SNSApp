import { PostModel } from '@/infrastructure/database/models/post'

export interface IPostService {
  /**
   * 投稿の存在チェック
   *
   * @param postId 投稿ID
   */
  isPostExists(postId: string): Promise<boolean> | never

  /**
   * 投稿したユーザーかどうかのチェック
   *
   * @param postId 投稿ID
   * @param userId ユーザーID
   */
  isPostUser(postId: string, userId: string): Promise<boolean> | never

  /**
   * ユーザーがいいねをしている投稿の存在チェック
   *
   * @param postId 投稿ID
   * @param userId ユーザーID
   * @param checkIsExist 存在チェックフラグ
   * @returns boolean
   */
  isUserLikedPostExits(
    postId: string,
    userId: string,
    throwErrorType?: 'isExist' | 'notExist',
  ): Promise<boolean> | never

  /**
   * 投稿のいいねの数を更新
   */
  updatePostLikeCount(postId: string, count: number): Promise<void>

  /**
   * 投稿情報を追加
   *
   * @param userId ユーザーID
   * @param posts 投稿一覧
   */
  addPostInfo(userId: string, posts: PostModel[]): Promise<PostModel[]>
}

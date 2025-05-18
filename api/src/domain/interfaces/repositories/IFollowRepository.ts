import type { FollowModel } from '@/infrastructure/database/models/follow'

export interface IFollowRepository {
  /**
   * ユーザーのフォロワーを取得する
   *
   * @param followerId フォロワーのユーザーID
   * @param followingId フォローユーザーID
   */
  findFollower(followerId: string, followingId: string): Promise<FollowModel | null>

  /**
   * ユーザーのフォロワー一覧を取得する
   *
   * @param followerId フォロワーのユーザーID
   */
  findFollowingsByFollowerId(followerId: string): Promise<FollowModel[]>

  /**
   * フォローユーザーを追加
   *
   * @param followerId フォロワーのユーザーID
   * @param followingId フォローユーザーID
   */
  addFollower(followerId: string, followingId: string): Promise<void>

  /**
   * フォローユーザーを削除
   *
   * @param followerId フォロワーのユーザーID
   * @param followingId フォローユーザーID
   */
  deleteFollower(followerId: string, followingId: string): Promise<void>

  /**
   * フォローユーザーを全削除
   *
   * @param followerId フォロワーのユーザーID
   */
  deleteFollowerByFollowerId(followerId: string): Promise<void>
}

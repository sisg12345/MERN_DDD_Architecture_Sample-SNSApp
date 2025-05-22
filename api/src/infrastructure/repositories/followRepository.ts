import { IFollowRepository } from '@/domain/interfaces/repositories/IFollowRepository'
import { injectable } from 'inversify'
import MongoFollow from '@/infrastructure/database/models/follow'
import type { FollowModel } from '@/infrastructure/database/models/follow'
import { log } from '@/shared/decorators/log'

@injectable()
export class FollowRepository implements IFollowRepository {
  /**
   * ユーザーのフォロワーを取得する
   *
   * @param followerId フォロワーのユーザーID
   * @param followingId フォローユーザーID
   */
  @log
  public async findFollower(followerId: string, followingId: string): Promise<FollowModel | null> {
    return await MongoFollow.findOne({ followerId, followingId })
  }

  /**
   * ユーザーのフォロワーを取得する
   *
   * @param followerId フォロワーのユーザーID
   */
  @log
  public async findFollowingsByFollowerId(followerId: string): Promise<FollowModel[]> {
    return await MongoFollow.find({ followerId })
  }

  /**
   * フォローユーザーを追加
   *
   * @param followerId フォロワーのユーザーID
   * @param followingId フォローユーザーID
   */
  @log
  public async addFollower(followerId: string, followingId: string): Promise<void> {
    await MongoFollow.create({ followerId, followingId })
  }

  /**
   * フォローユーザーを削除
   *
   * @param followerId フォロワーのユーザーID
   * @param followingId フォローユーザーID
   */
  @log
  public async deleteFollower(followerId: string, followingId: string): Promise<void> {
    await MongoFollow.deleteOne({ followerId, followingId })
  }

  /**
   * フォローユーザーを全削除
   *
   * @param followerId フォロワーのユーザーID
   */
  @log
  public async deleteFollowerByFollowerId(followerId: string): Promise<void> {
    await MongoFollow.deleteMany({ followerId })
  }
}

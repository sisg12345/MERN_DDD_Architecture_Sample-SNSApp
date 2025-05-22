import { injectable } from 'inversify'
import MongoLike, { LikeModel } from '@/infrastructure/database/models/like'
import { ILikeRepository } from '@/domain/interfaces/repositories/ILikeRepository'
import { log } from '@/shared/decorators/log'

@injectable()
export class LikeRepository implements ILikeRepository {
  /**
   * いいねを追加
   *
   * @param postId 投稿ID
   * @param userId ユーザーID
   */
  @log
  public async addPostLike(postId: string, userId: string): Promise<void> {
    await MongoLike.create({ postId, userId })
  }

  /**
   * いいねを削除
   *
   * @param postId 投稿ID
   */
  @log
  public async deletePostLike(postId: string[]): Promise<void> {
    // いいねを削除
    await MongoLike.deleteMany({ postId: { $in: postId } })
  }

  /**
   * ユーザーと投稿IDでいいねを検索
   *
   * @param postId 投稿ID
   * @param userId ユーザーID
   * @returns Like | null
   */
  @log
  public async findLikeByUserAndPost(postId: string, userId: string): Promise<LikeModel | null> {
    return await MongoLike.findOne({ postId, userId })
  }
}

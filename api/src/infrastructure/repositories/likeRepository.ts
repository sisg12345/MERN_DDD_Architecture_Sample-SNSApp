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

  /**
   * いいねの数が多いユーザーを取得（指定ユーザー以外、日付の新しい順）
   *
   * @param userId 除外するユーザーID
   * @param count 件数
   */
  @log
  public async findTopLikeUsers(
    userId: string,
    count: number,
  ): Promise<{ userId: string; postId: string }[]> {
    // 指定ユーザー以外で、いいね数が多い順＆日付の新しい順にユーザーを取得
    const pipeline = [
      { $match: { userId: { $ne: userId }, postId: { $exists: true, $ne: null } } },
      {
        $group: {
          _id: { userId: '$userId', postId: '$postId' },
          postId: { $first: '$postId' },
          userId: { $first: '$userId' },
          likeCount: { $sum: 1 },
          latestLike: { $max: '$createdAt' },
        },
      },
      { $sort: { likeCount: -1 as const, latestLike: -1 as const } },
      { $limit: count },
    ]

    // 取得結果
    const result = await MongoLike.aggregate(pipeline)

    // 返却データ
    const returnResult: { userId: string; postId: string }[] = []
    result.map((like) => {
      const { userId, postId } = like._id

      returnResult.push({
        userId,
        postId,
      })
    })

    return returnResult
  }
}

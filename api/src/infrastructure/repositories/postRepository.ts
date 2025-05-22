import { IPostRepository } from '@/domain/interfaces/repositories/IPostRepository'
import { injectable } from 'inversify'
import MongoPost from '@/infrastructure/database/models/post'
import type { PostModel } from '@/infrastructure/database/models/post'
import MongoLike from '@/infrastructure/database/models/like'
import { log } from '@/shared/decorators/log'

@injectable()
export class PostRepository implements IPostRepository {
  /**
   * 投稿を取得
   *
   * @param postId 投稿ID
   */
  @log
  public async findPostById(postId: string): Promise<PostModel | null> {
    return await MongoPost.findById(postId)
  }

  /**
   * 投稿を取得
   *
   * @param userId ユーザーID
   */
  @log
  public async findPostsByUserId(userId: string): Promise<PostModel[]> {
    return await MongoPost.find({ userId }).sort({ createdAt: -1 })
  }

  /**
   * 複数のユーザーの投稿を取得
   *
   * @param userIds ユーザーIDの配列
   */
  @log
  public async findPostsByUserIds(userIds: string[]): Promise<PostModel[]> {
    return await MongoPost.find({ userId: { $in: userIds } }).sort({ createdAt: -1 })
  }

  /**
   * 投稿を追加
   *
   * @param post 投稿内容
   */
  @log
  public async createPost(userId: string, message: string, image: string): Promise<void> {
    await MongoPost.create({ userId, message, image })
  }

  /**
   * 投稿を更新
   *
   * @param postId 投稿ID
   * @param message 投稿内容
   * @param image 投稿画像
   */
  @log
  public async updatePost(postId: string, message: string, image: string): Promise<void> {
    // 投稿を更新
    await MongoPost.updateOne(
      { _id: postId },
      {
        $set: {
          message,
          image,
        },
      },
    )
  }

  /**
   * 投稿を削除
   *
   * @param postId 投稿ID
   */
  @log
  public async deletePost(postId: string): Promise<void> {
    await MongoPost.deleteOne({ _id: postId })
  }

  /**
   * ユーザーIDの投稿を削除
   *
   * @param postId 投稿ID
   */
  @log
  public async deletePostByUserId(userId: string): Promise<void> {
    await MongoPost.deleteMany({ userId })
  }

  /**
   * 投稿にいいねを追加
   *
   * @param postId 投稿ID
   * @param userId ユーザーID
   */
  @log
  public async addPostLike(postId: string, userId: string): Promise<void> {
    await MongoLike.create({ postId, userId })
  }

  /**
   * 投稿のいいねを削除
   *
   * @param postId 投稿ID
   * @param userId ユーザーID
   */
  @log
  public async deletePostLike(postId: string, userId: string): Promise<void> {
    await MongoLike.deleteOne({ postId, userId })
  }

  /**
   * 投稿のいいねの数を更新
   *
   * @param postId 投稿ID
   * @param count 増減数
   */
  @log
  public async updatePostLikes(postId: string, count: number): Promise<void> {
    // 投稿を取得
    const post = await MongoPost.findById(postId)

    // 投稿のいいねの数を更新
    if (post) {
      post.likes += count
      await post.save()
    }
  }

  /**
   * 投稿のいいねを取得
   *
   * @param postId 投稿ID
   * @param userId ユーザーID
   */
  @log
  public async findPostLike(postId: string, userId: string): Promise<PostModel | null> {
    return await MongoLike.findOne({ postId, userId })
  }
}

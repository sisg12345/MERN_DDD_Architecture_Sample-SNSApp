import { inject, injectable } from 'inversify'
import { IPostService } from '@/domain/interfaces/services/IPostService'
import { IPostRepository } from '@/domain/interfaces/repositories/IPostRepository'
import { ILikeRepository } from '@/domain/interfaces/repositories/ILikeRepository'
import TYPES from '@/presentation/middlewares/di/symbol'
import { NotFoundError } from '@/shared/errors/notFoundError'
import { ForbiddenError } from '@/shared/errors/forbiddenError'
import { ConflictError } from '@/shared/errors/conflictError'
import type { PostModel } from '@/infrastructure/database/models/post'
import { IUserRepository } from '@/domain/interfaces/repositories/IUserRepository'
import { log } from '@/shared/decorators/log'

@injectable()
export class PostService implements IPostService {
  constructor(
    @inject(TYPES.IUserRepository) private _userRepository: IUserRepository,
    @inject(TYPES.IPostRepository) private _postRepository: IPostRepository,
    @inject(TYPES.ILikeRepository) private _likeRepository: ILikeRepository,
  ) {}

  /**
   * 投稿が存在するかどうかを確認
   *
   * @param postId 投稿ID
   */
  @log
  public async isPostExists(postId: string): Promise<boolean> | never {
    // 投稿取得
    const post = await this._postRepository.findPostById(postId)

    // 投稿が存在しない場合は404エラーをスロー
    if (!post) {
      throw new NotFoundError()
    }

    return true
  }

  /**
   * 投稿したユーザーがかどうかのチェック
   *
   * @param postId 投稿ID
   * @param userId ユーザーID
   */
  @log
  public async isPostUser(postId: string, userId: string): Promise<boolean> | never {
    // 投稿取得
    const post = await this._postRepository.findPostById(postId)

    // 投稿が存在しない場合は404エラーをスロー
    if (!post) {
      throw new NotFoundError()
    }
    // 投稿したユーザーではなあい場合は権限エラーをスロー
    if (post.userId !== userId) {
      throw new ForbiddenError()
    }

    return true
  }

  /**
   * ユーザーがいいねをしている投稿の存在チェック
   *
   * @param postId 投稿ID
   * @param userId ユーザーID
   * @param checkIsExist 存在チェックフラグ
   * @returns boolean
   */
  public async isUserLikedPostExits(
    postId: string,
    userId: string,
    throwErrorType: 'isExist' | 'notExist' = 'notExist',
  ): Promise<boolean> {
    const like = await this._likeRepository.findLikeByUserAndPost(postId, userId)

    // いいねが存在する場合はコンフリクトエラーをスロー
    if (throwErrorType === 'isExist' && like) {
      throw new ConflictError()
    }
    // いいねした投稿が存在しない場合は404エラーをスロー
    else if (throwErrorType === 'notExist' && like == null) {
      throw new NotFoundError()
    }

    return true
  }

  /**
   * 投稿のいいねの数を更新
   *
   * @param postId 投稿ID
   * @param count 増減数
   */
  public async updatePostLikeCount(postId: string, count: number): Promise<void> {
    // 投稿のいいねの数を更新
    await this._postRepository.updatePostLikes(postId, count)
  }

  /**
   * 投稿情報を追加
   *
   * @param userId ユーザーID
   * @param posts 投稿一覧
   */
  @log
  public async addPostInfo(userId: string, posts: PostModel[]): Promise<PostModel[]> {
    // 投稿にユーザーがいいね済み情報を追加
    const result = await Promise.all(
      posts.map(async (post): Promise<PostModel> => {
        // 投稿のいいね情報を取得
        const like = await this._postRepository.findPostLike(post.id, userId)
        // 投稿のユーザー情報を取得
        const user = await this._userRepository.findById(post.userId)
        // 返却する投稿データ
        const returnPost: PostModel = post.toObject()
        // ユーザーのいいね済み銃砲を追加
        returnPost.isLiked = !!like
        // ユーザーのプロフィール画像を追加
        returnPost.profilePicture = user!.profilePicture
        // ユーザーのユーザー名を追加
        returnPost.username = user!.username

        return returnPost
      }),
    )

    return result
  }
}

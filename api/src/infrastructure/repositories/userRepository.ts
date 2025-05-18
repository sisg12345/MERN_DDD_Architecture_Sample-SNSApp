import { injectable } from 'inversify'
import { IUserRepository } from '@/domain/interfaces/repositories/IUserRepository'
import MongoUser from '@/infrastructure/database/models/user'
import type { UserModel } from '@/infrastructure/database/models/user'
import { log } from '@/shared/decorators/log'

@injectable()
export class UserRepository implements IUserRepository {
  /**
   * ユーザーを取得
   *
   * @param id ユーザーID
   * @returns ユーザー情報
   */
  @log
  public async findById(userId: string): Promise<UserModel | null> {
    return await MongoUser.findById(userId)
  }

  /**
   * ユーザーを取得
   *
   * @param email ユーザーメールアドレス
   * @returns ユーザー情報
   */
  @log
  public async findUserByEmail(email: string): Promise<UserModel | null> {
    return await MongoUser.findOne({ email })
  }

  /**
   * ユーザーを取得
   *
   * @param username ユーザー名
   * @returns ユーザー情報
   */
  @log
  public async findUserByUsername(username: string): Promise<UserModel | null> {
    return await MongoUser.findOne({ username })
  }

  /**
   * ユーザーを作成
   *
   * @param email メールアドレス
   * @param hashedPassword ハッシュ化されたパスワード
   * @param username ユーザー名
   * @param profileImage プロフィール画像
   * @param coverImage プロフィールカバー画像
   */
  @log
  public async createUser(
    email: string,
    hashedPassword: string,
    username: string,
    profilePicture: string,
    coverPicture: string,
  ): Promise<void> {
    await MongoUser.create({
      email,
      password: hashedPassword,
      username,
      profilePicture,
      coverPicture,
    })
  }

  /**
   * ユーザー情報を更新
   *
   * @param userId ユーザーID
   * @param updateData 更新データ
   */
  @log
  public async updateUser(userId: string, updateData: Partial<UserModel>): Promise<void> {
    await MongoUser.findByIdAndUpdate(userId, {
      $set: updateData,
    })
  }

  /**
   * ユーザーを削除
   *
   * @param userId ユーザーID
   */
  @log
  public async deleteUser(userId: string): Promise<void> {
    await MongoUser.findByIdAndDelete(userId)
  }
}

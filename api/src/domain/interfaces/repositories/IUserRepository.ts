import type { UserModel } from '@/infrastructure/database/models/user'

export interface IUserRepository {
  /**
   * ユーザーを取得
   *
   * @param id ユーザーID
   * @returns ユーザー情報
   */
  findById(userId: string): Promise<UserModel | null>

  /**
   * ユーザーを取得
   *
   * @param email ユーザーメールアドレス
   * @returns ユーザー情報
   */
  findUserByEmail(email: string): Promise<UserModel | null>

  /**
   * ユーザーを取得
   *
   * @param username ユーザー名
   * @returns ユーザー情報
   */
  findUserByUsername(username: string): Promise<UserModel | null>

  /**
   * ユーザーを作成
   *
   * @param email メールアドレス
   * @param hashedPassword ハッシュ化されたパスワード
   * @param username ユーザー名
   * @param profileImage プロフィール画像
   * @param coverImage プロフィールカバー画像
   */
  createUser(
    email: string,
    hashedPassword: string,
    username: string,
    profileImage: string,
    coverImage: string,
  ): Promise<void>

  /**
   * ユーザー情報を更新
   *
   * @param userId ユーザーID
   * @param updateData 更新データ
   */
  updateUser(userId: string, updateData: Partial<UserModel>): Promise<void>

  /**
   * ユーザーを削除
   *
   * @param userId ユーザーID
   */
  deleteUser(userId: string): Promise<void>
}

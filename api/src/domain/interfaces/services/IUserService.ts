export interface IUserService {
  /**
   *  ユーザーが存在するかどうかを確認
   *
   * @param userId ユーザーID
   */
  isUserExits(userId: string): Promise<boolean> | never

  /**
   * ユーザーが登録済みではないことを確認
   *
   * @param username ユーザー名
   * @param email メールアドレス
   */
  isUserNoExits(username: string, email: string): Promise<boolean> | never

  /**
   * 変更しようとするメールアドレスとユーザー名が、他のユーザーに登録されていないか確認
   *
   * @param userId ユーザーID
   * @param email メールアドレス
   * @param username ユーザー名
   */
  isEmailOrUserUsed(userId: string, email: string, username: string): Promise<boolean> | never

  /**
   * フォロワーがいるかどうかの存在チェック
   *
   * @param followerId フォロワーのユーザーID
   * @param followingId フォローユーザーID
   * @returns boolean
   */
  isFollowingExists(
    followerId: string,
    followingId: string,
    throwErrorType?: 'isExist' | 'notExist',
  ): Promise<boolean> | never

  /**
   * 更新権限があるかどうかを確認
   *
   * @param userId ユーザーID
   */
  hasUpdateAuthority(userId: string): Promise<boolean> | never
}

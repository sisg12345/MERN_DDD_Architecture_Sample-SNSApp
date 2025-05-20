export class Command {
  constructor(
    // 更新を実行するユーザーID
    public readonly userId: string,
    // 更新データ
    public readonly updateData: {
      // ユーザーID
      id: string
    } & Partial<{
      // ユーザー名
      username: string
      // メールアドレス
      email: string
      // パスワード
      password: string
      // プロフィール画像URL
      profilePicture: string
      // カバー画像URL
      coverPicture: string
      // 管理者フラグ
      isAdmin: boolean
      // 自己紹介
      description: string
      // 居住地
      city: string
      // 出身地
      from: string
    }>,
  ) {}
}

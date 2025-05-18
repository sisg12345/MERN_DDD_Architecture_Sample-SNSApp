export class Command {
  constructor(
    // メールアドレス
    public readonly email: string,
    // パスワード
    public readonly password: string,
    // ユーザー名
    public readonly username: string,
    // プロフィール画像
    public readonly profilePicture: string,
    // プロフィールカバー画像
    public readonly coverPicture: string,
  ) {}
}

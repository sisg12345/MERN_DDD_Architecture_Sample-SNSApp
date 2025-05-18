export class Command {
  constructor(
    // メールアドレス
    public readonly email: string,
    // パスワード
    public readonly password: string,
  ) {}
}

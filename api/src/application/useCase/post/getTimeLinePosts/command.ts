export class Command {
  constructor(
    // ログインユーザー
    public readonly loginUserId: string,
    // ユーザーID
    public readonly userId: string,
  ) {}
}

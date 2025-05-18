export class Command {
  constructor(
    // ユーザーID
    public readonly userId: string,
    // 投稿メッセージ
    public readonly message: string,
    // 投稿画像
    public readonly image: string,
  ) {}
}

export class Command {
  constructor(
    // ユーザーID
    public readonly userId: string,
    // 投稿ID
    public readonly postId: string,
    // 投稿メッセージ
    public readonly message: string,
    // 投稿画像
    public readonly image: string,
  ) {}
}

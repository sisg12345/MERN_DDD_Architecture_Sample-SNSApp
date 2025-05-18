export class Command {
  constructor(
    // 投稿ID
    public readonly postId: string,
    // ユーザーID
    public readonly userId: string,
  ) {}
}

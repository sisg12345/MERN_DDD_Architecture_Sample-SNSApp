export class Command {
  constructor(
    // ユーザーID
    public readonly userId: string,
    // 投稿ID
    public readonly postId: string,
  ) {}
}

export class Command {
  constructor(
    // フォロワーユーザーID
    public readonly followerId: string,
    // フォローユーザーID
    public readonly followingId: string,
  ) {}
}

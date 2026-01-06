export class Command {
  constructor(
    // リクエストユーザーID
    public readonly requestUserId: string,
    // ユーザーID
    public readonly userId: string,
  ) {}
}

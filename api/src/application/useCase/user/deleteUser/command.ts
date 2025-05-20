export class Command {
  constructor(
    // ユーザーID
    public readonly userId: string,
    // 削除するユーザーID
    public readonly deleteUserId: string,
  ) {}
}

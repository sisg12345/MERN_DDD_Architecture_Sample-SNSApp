export class Command {
  constructor(
    // ユーザーID
    public readonly userId: string,
    // 取得ユーザー件数
    public readonly count: number,
  ) {}
}

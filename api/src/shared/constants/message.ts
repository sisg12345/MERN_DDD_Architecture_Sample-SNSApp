// メッセージ
export const MESSAGE = {
  // 成功
  success: {
    create: 'Successfully created.',
    update: 'Successfully updated.',
    delete: 'Successfully deleted.',
    fetch: 'Successfully fetched data.',
    auth: 'Authentication successful.',
  },
  // 失敗
  failure: {
    create: 'Failed to create.',
    update: 'Failed to update.',
    delete: 'Failed to delete.',
    fetch: 'Failed to fetch data.',
    auth: 'Authentication failed. Please check your credentials.',
  },
  // エラー
  error: {
    // バリデーション
    validation: 'Invalid request.',
    // Not Found
    notFound: 'Resource not found.',
    // サーバーエラー
    server: 'Internal server error.',
    // 認証エラー
    unauthorized: 'Unauthorized access.',
    // 権限エラー
    forbidden: 'Forbidden access.',
    // コンフリクトエラー
    conflict:
      'The request could not be completed due to a conflict with the current state of the resource.',
    // メールアドレスの重複エラー
    emailAlreadyExists: 'The email address is already in use.',
    // ユーザー名の重複エラー
    usernameAlreadyExists: 'The username is already in use.',
    // ログインエラー
    login: 'Login failed. Please check your email and password.',
  },
}

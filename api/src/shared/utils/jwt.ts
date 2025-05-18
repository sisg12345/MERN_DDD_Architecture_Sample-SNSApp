import jwt from 'jsonwebtoken'

/**
 * アクセストークン生成
 *
 * @param userId ユーザーID
 * @param email メールアドレス
 * @returns アクセストークン
 */
export const generateToken = (userId: string, email: string): string => {
  // シークレットキー
  const secretKey = process.env.JWT_SECRET_KEY as jwt.Secret | jwt.PrivateKey
  // トークンの有効期限
  const expiresIn = process.env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn']

  return jwt.sign({ userId, email }, secretKey, { expiresIn })
}

/**
 * リフレッシュトークン生成
 *
 * @param userId ユーザーID
 * @param email メールアドレス
 * @returns リフレッシュトークン
 */
export const generateRefreshToken = (userId: string, email: string) => {
  // シークレットキー
  const secretKey = process.env.REFRESH_TOKEN_SECRET_KEY as jwt.Secret | jwt.PrivateKey
  // トークンの有効期限
  const expiresIn = process.env.REFRESH_TOKEN_EXPIRES_IN as jwt.SignOptions['expiresIn']

  return jwt.sign({ userId, email }, secretKey, { expiresIn })
}

// ログインユーザー
export interface LoginUser {
  // ユーザーID
  userId: string
  // ユーザー名
  username: string
}

// ユーザー
export interface User {
  // ユーザーID
  id: string
  // ユーザー名
  username: string
  // メールアドレス
  email: string
  // パスワード
  password: string
  // プロフィール画像URL
  profilePicture: string
  // カバー画像URL
  coverPicture?: string
  // 管理者フラグ
  isAdmin: boolean
  // 自己紹介
  description?: string
  // 居住地
  city?: string
  // 出身地
  from?: string
  // 作成日時
  createdAt: Date
  // 更新日時
  updatedAt: Date
}

// 投稿
export interface Post {
  // 投稿ID
  id: string
  // ユーザーID
  userId: string
  // ユーザー名
  username: string
  // メッセージ
  message?: string
  // 画像
  image?: string
  // プロフィール画像URL
  profilePicture: string
  // いいねの数
  likes: number
  // いいね済み
  isLiked: boolean
  // 作成日時
  createdAt: Date
  // 更新日時
  updatedAt: Date
}

// いいね
export interface Like {
  // 投稿ID
  postId: string
  // ユーザーID
  userId: string
  // 作成日時
  createdAt: Date
  // 更新日時
  updatedAt: Date
}

// フォロー
export interface Follow {
  // フォロワーのユーザーID
  followerId: string
  // フォローしているユーザーID
  followingId: string
  // 作成日時
  createdAt: Date
  // 更新日時
  updatedAt: Date
}

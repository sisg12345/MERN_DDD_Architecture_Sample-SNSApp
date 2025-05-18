import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import { logout } from '@/stores/slices/authSlice'

/**
 * 認証ガード
 */
export const useAuthGuard = () => {
  // Reduxのdispatchフック
  const dispatch = useAppDispatch()
  // リフレッシュトークンを取得
  const { accessToken, refreshToken } = useAppSelector((state) => state.auth)

  if (!accessToken || !refreshToken) {
    dispatch(logout())
  }
}

import { createSlice } from '@reduxjs/toolkit'

export interface AuthState {
  userId: string
  username: string
  accessToken: string
  refreshToken: string
}

const initialState: AuthState = {
  userId: '',
  username: '',
  accessToken: '',
  refreshToken: '',
}

interface Action {
  payload: AuthState
  type: string
}

/**
 * ユーザー情報のSlice
 */
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: Action) => {
      state.userId = action.payload.userId
      state.username = action.payload.username
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
    },
    logout: () => {
      // ストレージをクリア (redux-persist情報をクリア)
      localStorage.clear()
      // ログイン画面に遷移
      window.location.href = '/login'
    },
  },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer

import { Outlet } from 'react-router-dom'
import './App.css'
import Header from '@/components/organisms/header/Header'
import { useAuthGuard } from '@/hooks/useAuthGuard'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from '@/pages/ErrorFallback'

function App() {
  // 認証ガード
  useAuthGuard()

  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Header />
        <Outlet />
      </ErrorBoundary>
    </>
  )
}

export default App

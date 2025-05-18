import Button from '@/components/atoms/button/Button'
import { Link } from 'react-router-dom'

/**
 * エラーページ
 */
export default function ErrorFallback() {
  return (
    <main className="flex flex-col justify-center items-center gap-5 w-screen h-screen">
      <p className="text-4xl font-bold">予期せぬエラーが発生</p>
      <Link to={'/login'}>
        <Button size="lg" className="w-64">
          ログイン画面に戻る
        </Button>
      </Link>
    </main>
  )
}

import Button from '@/components/atoms/button/Button'
import { Link, useLocation } from 'react-router-dom'

/**
 * 近日公開ページ
 */
export default function ComingSoon() {
  // ロケーション情報
  const location = useLocation()

  return (
    <main className="flex flex-col justify-center items-center gap-5 w-screen h-screen">
      <p className="text-4xl font-bold">Coming Soon ...</p>
      <Link to={location.state?.from ?? '/'}>
        <Button size="lg" className="w-64">
          戻る
        </Button>
      </Link>
    </main>
  )
}

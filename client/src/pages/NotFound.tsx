import Button from '@/components/atoms/button/Button'
import { Link } from 'react-router-dom'

/**
 * 404 Not Found ページ
 */
export default function NotFound() {
  return (
    <main className="flex flex-col justify-center items-center gap-5 w-screen h-screen">
      <p className="text-4xl font-bold">404 Not Found</p>
      <Link to={'/'}>
        <Button size="lg" className="w-64">
          ホームに戻る
        </Button>
      </Link>
    </main>
  )
}

import Button from '@/components/atoms/button/Button'
import CommentIconWithCount from '../icon/CommentIconWithCount'

interface CommentButtonProps {
  count?: number
  onClick: () => void
}

/**
 * コメントボタン
 */
export default function CommentButton({ count = 0, onClick }: CommentButtonProps) {
  return (
    <Button variant="none" className="flex items-center gap-1" onClick={onClick}>
      <CommentIconWithCount count={count} />
      <span className="ml-1">コメントする</span>
    </Button>
  )
}

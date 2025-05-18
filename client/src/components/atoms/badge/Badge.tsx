interface BadgeProps {
  className?: string
  count: number
}

/**
 * バッジ
 */
export default function Badge({ className = '', count }: BadgeProps) {
  return (
    <>
      <span
        className={`f ${className} flex items-center justify-center text-xs bg-amber-400 rounded-full`}
      >
        {count}
      </span>
    </>
  )
}

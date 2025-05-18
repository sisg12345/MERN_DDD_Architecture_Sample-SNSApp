interface SeparatorProps {
  className?: string
}

/**
 * セパレーター
 */
export default function Separator({ className = '' }: SeparatorProps) {
  return <hr className={`${className} my-2 border-rose-400`} />
}

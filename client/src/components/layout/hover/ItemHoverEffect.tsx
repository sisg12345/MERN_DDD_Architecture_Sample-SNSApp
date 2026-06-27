import type { PropsWithChildren } from 'react'

interface ItemHoverEffectProps {
  className?: string
  disabled?: boolean
}

/**
 * 項目ホバー時のレイアウト
 */
export default function ItemHoverEffect({
  className = '',
  disabled = false,
  children,
}: PropsWithChildren<ItemHoverEffectProps>) {
  const hoverClass = disabled ? '' : 'hover:text-white hover:bg-rose-200  cursor-pointer'

  return <div className={`${className} ${hoverClass} w-full rounded-md`}>{children}</div>
}

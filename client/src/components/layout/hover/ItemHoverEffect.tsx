import type { PropsWithChildren } from 'react'

interface ItemHoverEffectProps {
  className?: string
}

/**
 * 項目ホバー時のレイアウト
 */
export default function ItemHoverEffect({
  className = '',
  children,
}: PropsWithChildren<ItemHoverEffectProps>) {
  className += ' hover:text-white hover:bg-rose-200'
  return <div className={`${className} w-full rounded-md cursor-pointer`}>{children}</div>
}

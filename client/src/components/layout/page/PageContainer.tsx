import type { PropsWithChildren } from 'react'

/**
 * ページのレイアウト
 */
export default function PageContainer({ children }: PropsWithChildren) {
  return <div className="flex justify-center w-full">{children}</div>
}

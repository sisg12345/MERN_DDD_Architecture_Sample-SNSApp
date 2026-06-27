import type { JSX } from 'react'
import PageContainer from '@/components/layout/page/PageContainer'
import Sidebar from '@/components/organisms/sidebar/Sidebar'

interface UserProfileTemplateProps {
  renderContents: JSX.Element
}

/**
 * ユーザープロフィールページのテンプレート
 */
export default function UserProfileTemplate({ renderContents }: UserProfileTemplateProps) {
  return (
    <PageContainer>
      {/* サイドバー */}
      <Sidebar />
      {/* ユーザープロフィール情報 */}
      {renderContents}
    </PageContainer>
  )
}

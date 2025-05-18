import PageContainer from '@/components/layout/page/PageContainer'
import HomeRightBar from '@/components/organisms/rightBar/HomeRightBar'
import Sidebar from '@/components/organisms/sidebar/Sidebar'
import TimeLine from '@/components/organisms/timeline/TimeLine'

/**
 * ホームページ
 */
export default function Home() {
  return (
    <>
      <PageContainer>
        {/* サイドバー */}
        <Sidebar />
        {/* タイムライン */}
        <TimeLine isLoginUser={true} />
        {/* サイドバー右 */}
        <HomeRightBar />
      </PageContainer>
    </>
  )
}

import CircleImage from '@/components/atoms/image/CircleImage'

interface UserProfileInfoProps {
  username: string
  description?: string
  backgroundSrc: string
  userAccountSrc: string
}

/**
 * ユーザープロフィール情報
 */
export default function UserProfileInfo({
  username,
  description,
  backgroundSrc,
  userAccountSrc,
}: UserProfileInfoProps) {
  return (
    <div className="relative px-2 mb-2 w-full">
      <img
        src={backgroundSrc}
        alt="profile background image"
        className="object-cover w-full h-72"
      />
      <div className="absolute left-1/2 -translate-y-2/4 -translate-x-1/2 font-bold text-center">
        {/* ユーザーアカウント */}
        <CircleImage src={userAccountSrc} alt="user account" size="2xl" />
        <div>{username}</div>
      </div>
      <div className="p-2 pt-16 text-sm bg-rose-100 shadow min-h-24 rounded whitespace-pre-wrap">
        {description}
      </div>
    </div>
  )
}

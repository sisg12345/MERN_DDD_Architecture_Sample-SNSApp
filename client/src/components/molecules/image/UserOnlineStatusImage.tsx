import CircleImageWithLabel from './CircleImageWithLabel'

interface UserOnlineStatusImageProps {
  src: string
  alt?: string
  label: string
  className?: string
  labelClassName?: string
  isOnline?: boolean
  onClick?: () => void
}

/**
 * ユーザーオンラインステータス付きす画像
 */
export default function UserOnlineStatusImage({
  src,
  alt = '',
  label,
  className = '',
  labelClassName = '',
  isOnline = false,
  onClick,
}: UserOnlineStatusImageProps) {
  return (
    <div className={`${className} relative`}>
      <CircleImageWithLabel
        src={src}
        label={label}
        alt={alt}
        labelClassName={labelClassName}
        onClick={onClick}
      />
      {isOnline && (
        <span className="absolute w-3 h-3 rounded-full bg-green-300 top-0.5 left-9"></span>
      )}
    </div>
  )
}

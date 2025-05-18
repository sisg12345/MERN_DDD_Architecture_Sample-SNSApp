import type { ImgHTMLAttributes } from 'react'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface RoundedImageProps extends ImgHTMLAttributes<HTMLImageElement> {}

/**
 * 角丸画像
 */
export default function RoundedImage({ ...props }: RoundedImageProps) {
  // クラス属性
  props.className = props.className || ''
  props.className += ' max-w-full max-h-[200px] mt-2 rounded object-cover'

  return <img {...props} />
}

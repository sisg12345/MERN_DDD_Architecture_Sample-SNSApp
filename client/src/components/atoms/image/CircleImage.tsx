import type { ImgHTMLAttributes } from 'react'

interface CircleImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  size?: 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
}

/**
 * 円形画像
 */
export default function CircleImage({ size = 'base', ...props }: CircleImageProps) {
  // クラス属性
  let className = ''

  switch (size) {
    case 'sm':
      className = 'w-8 h-8'
      break
    case 'base':
      className = 'w-10 h-10'
      break
    case 'md':
      className = 'w-12 h-12'
      break
    case 'lg':
      className = 'w-16 h-16'
      break
    case 'xl':
      className = 'w-20 h-20'
      break
    case '2xl':
      className = 'w-24 h-24'
      break
    case '3xl':
      className = 'w-32 h-32'
      break
    case '4xl':
      className = 'w-40 h-40'
      break
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { className: _className, ...rest } = props

  return <img className={`${className} rounded-full object-cover`} {...rest} />
}

import CircleImage from '@/components/atoms/image/CircleImage'
import Label from '@/components/atoms/label/Label'
import type { PropsWithChildren } from 'react'

interface CircleImageWithLabelProps {
  src: string
  alt?: string
  className?: string
  label: string
  labelClassName?: string
  onClick?: () => void
}

/**
 * ラベル付きの円形画像
 */
export default function CircleImageWithLabel({
  src,
  alt = '',
  label,
  className = '',
  labelClassName = '',
  children,
  onClick,
}: PropsWithChildren<CircleImageWithLabelProps>) {
  return (
    <div onClick={onClick} className={`${className} flex items-center cursor-pointer`}>
      <CircleImage src={src} alt={alt} />
      <div className="flex flex-col justify-center ml-2 cursor-pointer">
        <Label label={label} className={`font-bold cursor-pointer ${labelClassName}`} />
        <span>{children}</span>
      </div>
    </div>
  )
}

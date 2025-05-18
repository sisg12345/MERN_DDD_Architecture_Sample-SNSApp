interface LabelProps {
  id?: string
  label: string
  className?: string
  size?: 'sm' | 'base' | 'md' | 'lg'
}

/**
 * ラベル
 */
export default function Label({ id, label, className = '', size = 'md' }: LabelProps) {
  // クラス属性
  className = className ? `${className} ` : ''

  switch (size) {
    case 'sm':
      className += 'text-sm'
      break
    case 'base':
      className += 'text-base'
      break
    case 'md':
      className += 'text-md'
      break
    case 'lg':
      className += 'text-lg'
      break
  }

  return (
    <label id={id} className={`${className}`}>
      {label}
    </label>
  )
}

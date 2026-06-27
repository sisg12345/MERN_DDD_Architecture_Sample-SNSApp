interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  message: string
  variant: 'error' | 'success'
}

/**
 * アラート
 */
export default function Alert({ message, variant, ...props }: AlertProps) {
  // クラス属性
  props.className = props.className || ''
  props.className += ' p-4 mb-4 text-sm font-semibold rounded-lg'

  switch (variant) {
    case 'error':
      props.className += ' bg-rose-200 text-rose-500'
      break
    case 'success':
      props.className += ' bg-green-200 text-green-500'
      break
  }

  return <div {...props}>{message}</div>
}

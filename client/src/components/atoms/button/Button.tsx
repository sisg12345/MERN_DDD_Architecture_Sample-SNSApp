import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'none'
  size?: 'base' | 'lg'
}

/**
 * ボタン
 */
export default function Button({
  variant = 'primary',
  size = 'base',
  children,
  ...props
}: PropsWithChildren<ButtonProps>) {
  // クラス属性
  props.className = props.className || ''
  props.className += ' p-2 text-xs rounded transition-all'

  switch (variant) {
    case 'primary':
      props.className += ' bg-rose-400 text-white'
      if (!props.disabled) {
        props.className += ' hover:bg-rose-500'
      }
      break
    case 'secondary':
      props.className += ' bg-gray-400 text-white'
      if (!props.disabled) {
        props.className += ' hover:bg-gray-500'
      }
      break
    case 'danger':
      props.className += ' bg-red-400 text-white'
      if (!props.disabled) {
        props.className += ' hover:bg-red-300'
      }
      break
    case 'success':
      props.className += ' bg-green-400 text-white'
      if (!props.disabled) {
        props.className += ' hover:bg-emerald-500'
      }
      break
    case 'none':
      props.className += ' bg-transparent'
      break
  }
  switch (size) {
    case 'lg':
      props.className += ' min-h-12 text-xl'
      break
  }
  if (props.disabled) {
    props.className += ' opacity-50 '
  }

  return <button {...props}>{children}</button>
}

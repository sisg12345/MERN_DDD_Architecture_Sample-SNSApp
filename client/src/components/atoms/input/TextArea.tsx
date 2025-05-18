import { useEffect, useRef, type ChangeEvent, type TextareaHTMLAttributes } from 'react'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  transparent?: boolean
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

/**
 * テキストエリア
 */
export default function TextArea({ transparent = true, onChange, ...props }: TextAreaProps) {
  // テキストエリアの参照
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  /**
   * テキストエリアの変更イベント
   */
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    // 親コンポーネントのonChangeを呼び出す
    onChange?.(e)
    // テキストエリアの高さを調整
    adjustTextareaHeight()
  }

  /**
   * テキストエリアの高さを調整
   */
  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      // 高さをリセット
      textareaRef.current.style.height = 'auto'
      // 必要な高さを設定
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }

  // 画面リサイズ時に高さを調整
  addEventListener('resize', adjustTextareaHeight)

  useEffect(() => {
    // 初期レンダリング時に高さを調整
    adjustTextareaHeight()
  }, [])

  // クラス属性
  props.className = props.className || ''
  props.className += ' w-full focus:outline-none resize-none break-words'
  // 背景透過
  if (transparent) {
    props.className += ' bg-transparent'
  }

  return <textarea ref={textareaRef} onChange={handleChange} {...props}></textarea>
}

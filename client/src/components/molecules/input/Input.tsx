import { useEffect, useState, type InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
}

/**
 * 入力フィールド
 */
export default function Input({ errorMessage = '', ...props }: InputProps) {
  // props.classNameはreadonlyであるため、props.classNameを変更することはできない
  const { className = '', ...rest } = props
  // エラー時のスタイルの状態管理
  const [errorStyle, setErrorStyle] = useState<string>('')

  useEffect(() => {
    // エラーメッセージが空であれば、エラー時のスタイルを削除する
    if (!errorMessage) {
      setErrorStyle('')

      return
    }
    // エラーメッセージが空でなければ、エラー時のスタイルを追加する
    setErrorStyle('border-solid border-2 border-red-400')
  }, [errorMessage])

  return (
    <div>
      <input
        className={`${className} ${errorStyle} w-full h-12 p-2 focus:outline-none rounded hover:bg-rose-200 hover:text-white text-rose-400 `}
        {...rest}
      />
      <div className="mt-1 text-red-400">{errorMessage}</div>
    </div>
  )
}

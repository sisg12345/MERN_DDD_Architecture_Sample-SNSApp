import type { JSX } from 'react'

interface LoginPageTemplateProps {
  formRender(formLayout: string): JSX.Element
}

/**
 * ログインページのテンプレート
 */
export default function LoginPageTemplate({ formRender }: LoginPageTemplateProps) {
  // フォームのレイアウト
  const formLayout = 'flex flex-col gap-4 lg:gap-8 p-5 lg:p-10 w-full max-w-md bg-rose-100 rounded'

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="flex flex-col lg:flex-row justify-center items-center w-9/12">
        <div className="flex flex-col justify-center items-center p-5 lg:p-10">
          <span className="font-bold text-5xl">ᕦ(ò_óˇ)ᕤ</span>
          <span className="font-extrabold text-9xl">SNS</span>
        </div>
        {formRender(formLayout)}
      </div>
    </div>
  )
}

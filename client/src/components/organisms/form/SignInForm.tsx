import Button from '@/components/atoms/button/Button'
import Input from '@/components/molecules/input/Input'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

interface SignInFormProps {
  className?: string
  errorMessage?: string
  onLogin: (email: string, password: string) => void
}

// バリデーションスキーマ
const schema = z.object({
  email: z.string().email('メールアドレスの形式が正しくありません'),
  password: z
    .string()
    .min(6, 'パスワードは6文字以上で入力してください')
    .max(100, `パスワードは$100文字以下で入力してください`)
    .regex(/^(?=.*?[a-z])(?=.*?\d)[a-z\d]/i, 'パスワードは半角英数字混合で入力してください'),
})

type FormValues = z.infer<typeof schema>

/**
 * サインインフォーム
 */
export default function SignInForm({ className = '', errorMessage, onLogin }: SignInFormProps) {
  // navigateフック
  const navigate = useNavigate()
  // useFormの初期化
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  /**
   * フォームの送信処理
   *
   * @param data フォームのデータ
   */
  const onSubmit = (data: FormValues) => {
    onLogin(data.email, data.password)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className}>
      <Input
        type="text"
        placeholder="メールアドレス"
        maxLength={50}
        {...register('email')}
        errorMessage={errors.email?.message}
      />
      <Input
        type="password"
        placeholder="パスワード"
        maxLength={100}
        {...register('password')}
        errorMessage={errors.password?.message}
      />
      {Object.keys(errors).length === 0 && errorMessage && (
        <p className="text-red-400">{errorMessage}</p>
      )}
      <Button type="submit" size="lg">
        ログイン
      </Button>
      <Link
        to="/coming-soon"
        state={{ from: window.location.pathname }}
        className="font-semibold max-w-fit hover:text-rose-500"
      >
        パスワードを忘れた方
      </Link>
      <Button type="button" variant="success" size="lg" onClick={() => navigate('/register')}>
        新規登録
      </Button>
    </form>
  )
}

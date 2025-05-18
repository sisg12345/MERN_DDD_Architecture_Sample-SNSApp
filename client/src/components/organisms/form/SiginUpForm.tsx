import Button from '@/components/atoms/button/Button'
import Input from '@/components/molecules/input/Input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

interface SignUpFormProps {
  className?: string
  errors?: Record<string, string> | null
  onRegister: (username: string, email: string, password: string) => void
}

// バリデーションスキーマ
const schema = z
  .object({
    username: z
      .string()
      .min(3, 'ユーザー名は3文字以上で入力してください')
      .max(20, 'ユーザー名は20文字以下で入力してください'),
    email: z.string().email('メールアドレスの形式が正しくありません'),
    password: z
      .string()
      .min(6, 'パスワードは6文字以上で入力してください')
      .max(100, `パスワードは$100文字以下で入力してください`)
      .regex(/^(?=.*?[a-z])(?=.*?\d)[a-z\d]/i, 'パスワードは半角英数字混合で入力してください'),
    passwordConfirm: z.string().min(6, 'パスワードは6文字以上で入力してください'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'パスワードが一致しません',
    path: ['passwordConfirm'],
  })

type FormValues = z.infer<typeof schema>

/**
 * サインアップフォーム
 */
export default function SignUpForm({ className = '', errors, onRegister }: SignUpFormProps) {
  // useFormの初期化
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
  })

  /**
   * フォームの送信処理
   *
   * @param data フォームのデータ
   */
  const onSubmit = (data: FormValues) => {
    onRegister(data.username, data.email, data.password)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className}>
      <Input
        type="text"
        placeholder="ユーザー名"
        maxLength={20}
        {...register('username')}
        errorMessage={formErrors.username?.message || errors?.username}
      />
      <Input
        type="text"
        placeholder="メールアドレス"
        maxLength={50}
        {...register('email')}
        errorMessage={formErrors.email?.message || errors?.email}
      />
      <Input
        type="password"
        placeholder="パスワード"
        maxLength={100}
        {...register('password')}
        errorMessage={formErrors.password?.message}
      />
      <Input
        type="password"
        placeholder="パスワード再入力"
        maxLength={100}
        {...register('passwordConfirm')}
        errorMessage={formErrors.passwordConfirm?.message}
      />
      <Button type="submit" variant="success" size="lg">
        登録
      </Button>
    </form>
  )
}

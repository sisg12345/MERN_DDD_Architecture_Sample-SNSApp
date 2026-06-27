import Button from '@/components/atoms/button/Button'
import Input from '@/components/molecules/input/Input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import messages from '@/messages/messages.json'
import { formatMessage } from '@/utils/messageUtil'

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
      .min(3, formatMessage(messages.error.validation.minLength, ['ユーザー名', 3]))
      .max(20, formatMessage(messages.error.validation.maxLength, ['ユーザー名', 20])),
    email: z.string().email(formatMessage(messages.error.validation.format, ['メールアドレス'])),
    password: z
      .string()
      .min(6, formatMessage(messages.error.validation.minLength, ['パスワード', 6]))
      .max(100, formatMessage(messages.error.validation.maxLength, ['パスワード', 100]))
      .regex(
        /^(?=.*?[a-z])(?=.*?\d)[a-z\d]/i,
        formatMessage(messages.error.validation.patternAlphabet, ['パスワード']),
      ),
    passwordConfirm: z
      .string()
      .min(6, formatMessage(messages.error.validation.minLength, ['パスワード再入力', 6])),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: formatMessage(messages.error.validation.mismatch, ['パスワード']),
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

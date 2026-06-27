import CircleImage from '@/components/atoms/image/CircleImage'
import TextArea from '@/components/atoms/input/TextArea'
import { useAppSelector } from '@/hooks/useRedux'
import type { User } from '@/types'
import { useEffect } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import Input from '@/components/molecules/input/Input'
import Button from '@/components/atoms/button/Button'
import ItemHoverEffect from '@/components/layout/hover/ItemHoverEffect'
import Separator from '@/components/atoms/separator/Separator'
import Alert from '@/components/atoms/alert/Alert'
import { formatMessage } from '@/utils/messageUtil'
import messages from '@/messages/messages.json'

interface UserProfileFormProps {
  profileUserId: string
  user: User
  readonly?: boolean
  isSuccess?: boolean
  errors?: Record<string, string> | null
  onUpdateProfile?: (user: User) => Promise<void>
}

// バリデーションスキーマ
const schema = z.object({
  username: z
    .string()
    .min(3, formatMessage(messages.error.validation.minLength, ['ユーザー名', 3]))
    .max(20, formatMessage(messages.error.validation.maxLength, ['ユーザー名', 20])),
  email: z
    .string()
    .max(50, formatMessage(messages.error.validation.maxLength, ['メールアドレス', 50]))
    .email(formatMessage(messages.error.validation.format, ['メールアドレス'])),
  from: z
    .string()
    .max(50, formatMessage(messages.error.validation.maxLength, ['出身', 50]))
    .optional(),
  city: z
    .string()
    .max(50, formatMessage(messages.error.validation.maxLength, ['都市', 50]))
    .optional(),
  description: z
    .string()
    .max(500, formatMessage(messages.error.validation.maxLength, ['自己紹介', 500]))
    .optional(),
})

type FormValues = z.infer<typeof schema>

/**
 * ユーザープロフィール情報
 */
export default function UserProfileForm({
  profileUserId,
  user,
  readonly = false,
  isSuccess = false,
  errors,
  onUpdateProfile,
}: UserProfileFormProps) {
  // useFormの初期化
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: user.username ?? '',
      email: user.email ?? '',
      from: user.from ?? '',
      city: user.city ?? '',
      description: user.description ?? '',
    },
  })
  // ログインユーザーID情報
  const loginUserId = useAppSelector((state) => state.auth.userId)
  // ログインユーザーかどうか
  const isLoginUser = profileUserId === loginUserId

  useEffect(() => {
    reset({
      username: user.username ?? '',
      email: user.email ?? '',
      from: user.from ?? '',
      city: user.city ?? '',
      description: user.description ?? '',
    })
  }, [reset, user])

  /**
   * フォームの送信処理
   *
   * @param data フォームのデータ
   */
  const onSubmit = (data: FormValues) => {
    onUpdateProfile?.(data as User)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative px-2 mb-2 w-full">
      <img
        src={user.profilePicture}
        alt="profile background image"
        className="object-cover w-full h-72"
      />
      <div className="absolute left-1/2 -translate-y-2/4 -translate-x-1/2 font-bold text-center">
        {/* ユーザーアカウント */}
        <CircleImage src={user.profilePicture} alt="user account" size="2xl" />
      </div>
      <div
        className={`p-2 px-4 mt-2 shadow rounded text-sm ${readonly ? 'pointer-events-none' : ''}`}
      >
        <div className="flex items-center mt-5">
          <label htmlFor="username">ユーザー名:</label>
          <div className="flex-1">
            <Input
              className="bg-transparent"
              type="text"
              maxLength={20}
              placeholder={readonly ? '' : formatMessage(messages.placeholder.input.username)}
              readOnly={readonly}
              {...register('username')}
              errorMessage={formErrors.username?.message || errors?.username}
            />
          </div>
        </div>
        <Separator />
        <div className="flex flex-col mt-6">
          <label htmlFor="description">自己紹介:</label>
          <ItemHoverEffect>
            <TextArea
              id="description"
              maxLength={500}
              placeholder={readonly ? '' : formatMessage(messages.placeholder.input.description)}
              readOnly={readonly}
              {...register('description')}
            />
          </ItemHoverEffect>
        </div>
        <Separator />
        <div className="flex items-center">
          <label htmlFor="email">メールアドレス:</label>
          <div className="flex-1">
            <Input
              className="bg-transparent"
              type="text"
              placeholder={readonly ? '' : formatMessage(messages.placeholder.input.email)}
              readOnly={readonly}
              {...register('email')}
              errorMessage={formErrors.email?.message || errors?.email}
            />
          </div>
        </div>
        <Separator />
        <div className="flex items-center">
          <label htmlFor="from">出身:</label>
          <div className="flex-1">
            <Input
              className="bg-transparent"
              type="text"
              maxLength={50}
              placeholder={readonly ? '' : formatMessage(messages.placeholder.input.from)}
              readOnly={readonly}
              {...register('from')}
              errorMessage={formErrors.from?.message}
            />
          </div>
        </div>
        <Separator />
        <div className="flex items-center">
          <label htmlFor="city">都市:</label>
          <div className="flex-1">
            <Input
              className="bg-transparent"
              type="text"
              maxLength={50}
              placeholder={readonly ? '' : formatMessage(messages.placeholder.input.city)}
              readOnly={readonly}
              {...register('city')}
              errorMessage={formErrors.city?.message}
            />
          </div>
        </div>
      </div>
      {isSuccess && (
        <Alert
          className="mt-2"
          message={formatMessage(messages.success.profileUpdate)}
          variant="success"
        />
      )}
      {isLoginUser && !readonly && (
        <div className="flex justify-end mt-2">
          <Button type="button" variant="danger" className="px-8 mr-2" onClick={() => reset()}>
            キャンセル
          </Button>
          <Button type="submit" variant="success" className="px-12">
            保存
          </Button>
        </div>
      )}
    </form>
  )
}

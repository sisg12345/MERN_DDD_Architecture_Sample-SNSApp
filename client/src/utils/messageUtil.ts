type MessageParamValue = string | number
type MessageParams = MessageParamValue[] | Record<string, MessageParamValue>

/**
 * メッセージのプレースホルダーを置換する
 *
 * 対応形式:
 * - formatMessage('ユーザー名を入力してください')
 * - formatMessage('{0}は{1}文字以下で入力してください。', ['都市', 50])
 * - formatMessage('{field}は{max}文字以下で入力してください。', ['都市', 50])
 * - formatMessage('{field}は{max}文字以下で入力してください。', { field: '都市', max: 50 })
 *
 * @param message メッセージテンプレート
 * @param params 埋め込む値
 * @returns 置換後のメッセージ
 */
export const formatMessage = (message: string, params?: MessageParams): string => {
  if (!params) {
    return message
  }

  let arrayIndex = 0

  return message.replace(/\{(\w+)\}/g, (_, key: string) => {
    const value = Array.isArray(params)
      ? /^\d+$/.test(key)
        ? params[Number(key)]
        : params[arrayIndex++]
      : params[key]

    return value !== undefined ? String(value) : `{${key}}`
  })
}

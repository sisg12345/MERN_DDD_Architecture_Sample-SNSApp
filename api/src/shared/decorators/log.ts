import { loggerInfo } from '@/lib/pino'

/**
 * メソッドの実行内(引数や戻り値)をログ出力するデコレータ
 *
 * @param target メソッドを含むクラスのプロトタイプ
 * @param propertyKey デコレート対象のメソッド名
 * @param descriptor メソッドのプロパティディスクリプタ
 * @returns ログ機能を適用したプロパティディスクリプタ
 *
 * @remarks
 * メソッドが呼び出された際にクラス名、メソッド名、引数をログ出力する
 * メソッドの戻り値が存在する場合、それをログ出力する
 * 同期メソッドと非同期メソッドの両方に対応し、Promise の場合は解決された値をログ出力する
 */
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  // 実行元メソッド
  const originalMethod = descriptor.value

  // 実行するメソッドを上書き
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  descriptor.value = function (...args: any[]) {
    // メソッドのクラス名
    const className = target.constructor.name
    // クラスとメソッド名
    const classMethodName = `${className}.${propertyKey}`

    // 引数がある場合
    if (args) {
      loggerInfo({ execute: classMethodName, timing: 'start', args: args })
    } else {
      loggerInfo({ execute: classMethodName, timing: 'start' })
    }

    // 元のメソッドを実行
    const result = originalMethod.apply(this, args)

    // Promiseの場合の対応
    if (result instanceof Promise) {
      return result.then((res) => {
        loggerInfo({ execute: classMethodName, timing: 'end' })

        return res
      })
    } else {
      loggerInfo({ execute: classMethodName, timing: 'end' })
    }

    return result
  }

  return descriptor
}

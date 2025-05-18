import pino from 'pino'

const pinoConfig = {
  formatters: {
    // レベルをラベルに変換
    // ex) { "level": 30, ... } -> { "level": "info" }
    level: (label: string) => {
      return {
        level: label,
      }
    },
  },
  // タイムスタンプの形式の設定
  timestamp: pino.stdTimeFunctions.isoTime,
}

const logger = pino(pinoConfig)

type Option = {
  // ファクション名
  execute: string
  // タイミング
  timing: 'start' | 'end'
  // ファクションの引数
  args?: unknown
  // ファクションの戻り値
  return?: unknown
}

export const loggerError = (option: Option, message?: string) => {
  return logger.info(option, message)
}

export const loggerWarn = (option: Option, message?: string) => {
  return logger.info(option, message)
}

export const loggerInfo = (option: Option, message?: string) => {
  return logger.info(option, message)
}

export const loggerDebug = (option: Option, message?: string) => {
  return logger.info(option, message)
}

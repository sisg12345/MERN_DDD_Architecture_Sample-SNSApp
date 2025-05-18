// ストレージのアプリの識別キー
export type AppKey = 'persist:sns'
// ストレージのキー
export type StorageKey = 'auth'
// ストレージタイプ
type StorageType = 'local' | 'session'

export class AppStorage<T> {
  // アプリ名
  #app: AppKey
  // ストレージタイプ
  #storage: Storage
  // ストレージでアクセスするデータ
  #data: Record<StorageKey, T | undefined>

  /**
   *
   * @param app アプリ名
   * @param storage ストレージタイプ
   */
  constructor(app: AppKey, storage: StorageType = 'local') {
    // アクセスアプリ
    this.#app = app
    // ストレージタイプ
    this.#storage = storage === 'local' ? localStorage : sessionStorage
    // ストレージの初期化, データがない場合は空オブジェクトを生成
    this.#data = JSON.parse(this.#storage.getItem(app) || '{}')
  }

  /**
   * ストレージに保存するデータをセット
   *
   * @param key ストレージキー
   * @param value ストレージに保存するデータ
   */
  setItem(key: StorageKey, value: T): void {
    this.#data[key] = value
  }

  /**
   * ストレージからデータを取得
   *
   * @param key ストレージキー
   * @returns ストレージから取得したデータ
   */
  getItem(key: StorageKey): T | undefined {
    return this.#data[key]
  }

  /**
   * ストレージからデータを削除
   *
   * @param key ストレージキー
   */
  removeItem(key: StorageKey): void {
    // ストレージからデータを削除
    delete this.#data[key]
  }

  /**
   * データをストレージに保存
   */
  save(): void {
    for (const key in this.#data) {
      const storageKey = key as StorageKey

      if (this.#data[storageKey] == null) {
        delete this.#data[storageKey]
      }
    }

    this.#storage[this.#app] = JSON.stringify(this.#data)
  }

  /**
   * ストレージをクリア
   */
  clear(): void {
    this.#storage.clear()
  }
}

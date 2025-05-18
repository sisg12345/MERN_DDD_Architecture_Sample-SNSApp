import { SearchIcon } from '@/components/atoms/icon/Icon'
import { useState } from 'react'
import type { FormEvent } from 'react'

interface SearchInputProps {
  className?: string
  onSearch: (searchWord: string) => void
}

/**
 * 検索欄
 */
export default function SearchInput({ className = '', onSearch }: SearchInputProps) {
  // 検索ワードの状態管理
  const [searchWord, setSearchWord] = useState<string>('')

  /**
   * 検索
   *
   * @param e フォームイベント
   */
  const handleSubmit = (e: FormEvent<HTMLFormElement> | React.MouseEvent<SVGElement>) => {
    // フォームのデフォルトの動作を防ぐ
    e.preventDefault()

    // 検索ワードが空でない場合のみ検索を実行
    if (searchWord.trim() !== '') {
      // 検索
      onSearch(searchWord)
      // 検索後に入力欄を空にする
      setSearchWord('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`${className} flex items-center bg-white rounded`}>
      <SearchIcon className="text-rose-400 ml-2" onClick={handleSubmit} />
      <input
        type="text"
        placeholder="Search..."
        className="w-full h-8 px-2 mr-2 focus:outline-none text-rose-400"
        value={searchWord}
        onChange={(e) => setSearchWord(e.target.value)}
      />
    </form>
  )
}

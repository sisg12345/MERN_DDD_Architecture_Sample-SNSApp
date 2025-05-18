interface SectionTitleProps {
  title: string
  className?: string
}

/**
 * セクションタイトル
 */
export default function SectionTitle({ title, className = '' }: SectionTitleProps) {
  return <h2 className={`${className} text-sm font-bold`}>{title}</h2>
}

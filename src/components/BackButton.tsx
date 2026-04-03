import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface BackButtonProps {
  href?: string
  label?: string
  className?: string
}

const BackButton = ({ href = '/', label = 'Back to home', className = '' }: BackButtonProps) => {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors ${className}`}
    >
      <ArrowLeft size={16} />
      {label}
    </Link>
  )
}

export default BackButton

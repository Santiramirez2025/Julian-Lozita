import { cn } from '@/lib/utils'

interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'new'
  pulse?: boolean
  className?: string
  children: React.ReactNode
}

export default function Badge({ variant = 'default', pulse = false, className, children }: BadgeProps) {
  const variants = {
    default: 'bg-gray-100 text-text-light',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border border-amber-200',
    danger: 'bg-red-50 text-red-700 border border-red-200',
    info: 'bg-blue-50 text-blue-700 border border-blue-200',
    new: 'bg-accent/10 text-accent border border-accent/20',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold',
        variants[variant],
        pulse && 'badge-pulse',
        className
      )}
    >
      {children}
    </span>
  )
}

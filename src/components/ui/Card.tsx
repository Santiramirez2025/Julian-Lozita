import { cn } from '@/lib/utils'

interface CardProps {
  className?: string
  glass?: boolean
  hover3d?: boolean
  children: React.ReactNode
}

export default function Card({ className, glass = false, hover3d = false, children }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl overflow-hidden',
        glass ? 'glass' : 'bg-white border border-border',
        hover3d && 'card-3d',
        !glass && 'shadow-sm hover:shadow-lg transition-shadow duration-300',
        className
      )}
    >
      {children}
    </div>
  )
}

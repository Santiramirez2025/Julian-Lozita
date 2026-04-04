'use client'

import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-text mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'w-full px-4 py-3 rounded-xl border border-border bg-white text-text placeholder:text-text-light/60',
              'transition-all duration-200',
              'focus:border-primary-light focus:ring-2 focus:ring-primary-light/10',
              icon ? 'pl-10' : '',
              error ? 'border-sold focus:border-sold focus:ring-sold/10' : '',
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="mt-1 text-xs text-sold">{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'
export default Input

import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input"> & { icon?: React.ReactNode, suffix?: React.ReactNode }>(
  ({ className, type, icon, suffix, ...props }, ref) => {
    return (
      <div className="relative flex items-center">
        {icon && <div className="absolute left-3 text-muted-foreground [&>svg]:h-5 [&>svg]:w-5">{icon}</div>}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-lg border border-input bg-card px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            icon ? "pl-10" : "",
            suffix ? "pr-10" : "",
            className
          )}
          ref={ref}
          {...props}
        />
        {suffix && <div className="absolute right-3 text-muted-foreground [&>svg]:h-5 [&>svg]:w-5">{suffix}</div>}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }

// components/ui/input.tsx

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  noOutline?: boolean; // New prop to conditionally remove outline
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, noOutline, ...props }, ref) => {
    return (
      <input
        type="text" // Example: Adjust as per your usage
        className={cn(
          "flex h-10 w-full rounded-md bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          !noOutline && "file:border-2 file:border-primary-300", // Apply outline if !noOutline
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };

import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef(({ 
  type = "text",
  label,
  error,
  className,
  ...props 
}, ref) => {
  const inputStyles = "w-full px-3 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 bg-white";
  
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      
      <input
        ref={ref}
        type={type}
        className={cn(
          inputStyles,
          error && "border-danger-500 focus:ring-danger-500 focus:border-danger-500",
          className
        )}
        {...props}
      />
      
      {error && (
        <p className="text-sm text-danger-600">{error}</p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
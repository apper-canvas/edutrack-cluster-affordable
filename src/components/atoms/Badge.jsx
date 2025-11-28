import React from "react";
import { cn } from "@/utils/cn";

const Badge = ({ children, variant = "default", size = "md", className, ...props }) => {
  const baseStyles = "inline-flex items-center font-medium rounded-full border";
  
  const variants = {
    default: "bg-slate-100 text-slate-800 border-slate-200",
    success: "bg-success-100 text-success-800 border-success-200",
    warning: "bg-warning-100 text-warning-800 border-warning-200", 
    danger: "bg-danger-100 text-danger-800 border-danger-200",
    info: "bg-blue-100 text-blue-800 border-blue-200",
    primary: "bg-primary-100 text-primary-800 border-primary-200"
  };
  
  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-2.5 py-1.5 text-sm",
    lg: "px-3 py-2 text-sm"
  };

  return (
    <span
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
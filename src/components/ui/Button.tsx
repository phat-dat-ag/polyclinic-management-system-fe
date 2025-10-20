import { cn } from "../../lib/utils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
}

export const Button = ({
    className,
    children,
    variant = "default",
    size = "md",
    ...props
}: ButtonProps) => {
    const base =
        "rounded-xl font-medium transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
        default: "bg-blue-500 text-white hover:bg-blue-600",
        outline: "border border-blue-500 text-blue-500 hover:bg-blue-50",
        ghost: "text-blue-500 hover:bg-blue-100",
    };

    const sizes = {
        sm: "px-3 py-1 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
    };

    return (
        <button
            className={cn(base, variants[variant], sizes[size], className)}
            {...props}
        >
            {children}
        </button>
    );
};

import { cn } from "../../lib/utils";

import React from "react";

export const Card = ({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div
            className={cn(
                "rounded-2xl border border-gray-200 bg-white shadow-sm",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export const CardHeader = ({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn("p-4 border-b border-gray-100", className)} {...props}>
        {children}
    </div>
);

export const CardTitle = ({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className={cn("text-lg font-semibold", className)} {...props}>
        {children}
    </h3>
);

export const CardContent = ({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn("p-4", className)} {...props}>
        {children}
    </div>
);

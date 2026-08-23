import * as React from "react";
import { cn } from "@/lib/utils";

export function Changelog({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("relative border-l border-border ml-3 space-y-10 py-6", className)} {...props}>
      {children}
    </div>
  );
}

export interface ChangelogItemProps extends React.HTMLAttributes<HTMLDivElement> {
  date: string;
}

export function ChangelogItem({ date, className, children, ...props }: ChangelogItemProps) {
  return (
    <div className={cn("relative pl-8", className)} {...props}>
      <div className="absolute left-[-5px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background" />
      <div className="mb-2 text-sm font-medium text-muted-foreground">{date}</div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

export function ChangelogItemVersion({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("text-lg font-bold text-primary", className)} {...props}>
      {children}
    </div>
  );
}

export function ChangelogItemTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("text-2xl font-semibold tracking-tight text-foreground", className)} {...props}>
      {children}
    </h3>
  );
}

export function ChangelogItemDescription({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("text-muted-foreground text-base leading-relaxed space-y-4", className)} {...props}>
      {children}
    </div>
  );
}

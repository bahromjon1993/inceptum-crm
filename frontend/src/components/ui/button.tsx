import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 hover:shadow-indigo-500/25 border border-indigo-500/20",
        destructive:
          "bg-rose-600 text-white shadow-sm hover:bg-rose-500 hover:shadow-rose-500/20 border border-rose-500/20",
        outline:
          "border border-zinc-700/80 bg-zinc-900/60 text-zinc-100 hover:bg-zinc-800 hover:text-white hover:border-zinc-600",
        secondary:
          "bg-zinc-800/80 text-zinc-200 hover:bg-zinc-700/80 border border-zinc-700/50",
        ghost:
          "text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-100",
        link: "text-indigo-400 underline-offset-4 hover:underline",
        linear:
          "bg-gradient-to-b from-zinc-800 to-zinc-900 text-zinc-100 border border-zinc-700/60 shadow-sm hover:border-zinc-500/80 hover:from-zinc-700 hover:to-zinc-800",
        glow:
          "bg-indigo-600 text-white shadow-glow hover:bg-indigo-500 border border-indigo-400/30",
        emerald:
          "bg-emerald-600 text-white shadow-sm hover:bg-emerald-500 hover:shadow-emerald-500/20 border border-emerald-500/20"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-11 rounded-lg px-6 text-base",
        icon: "h-9 w-9 p-0",
        xs: "h-7 rounded px-2.5 text-xs font-semibold"
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

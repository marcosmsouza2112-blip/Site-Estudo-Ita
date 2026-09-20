import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium select-none rounded-[var(--radius-sm)] transition-[opacity,transform,background-color,color,box-shadow] duration-150 ease-[var(--ease-out)] active:not-disabled:scale-[0.96] disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent min-h-11 px-4 text-sm",
  {
    variants: {
      variant: {
        primary: "bg-accent text-accent-fg hover:opacity-90",
        ghost:
          "bg-transparent text-fg hover:bg-elevated shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]",
        outline:
          "bg-transparent text-fg shadow-[var(--shadow-border)] hover:bg-elevated",
        paper: "bg-paper text-ink hover:opacity-90",
        danger: "bg-danger text-paper hover:opacity-90",
      },
      size: {
        md: "min-h-11 px-4",
        sm: "min-h-9 px-3 text-xs",
        lg: "min-h-12 px-5",
        icon: "size-11 p-0",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

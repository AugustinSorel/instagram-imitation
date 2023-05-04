import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "~/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center fill-primary/75 fill-current justify-center rounded-md font-md text-sm transition-colors capitalize focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default:
          "bg-primary/5 border border-primary/10 text-foreground hover:bg-primary/10",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "flex items-center justify-start hover:bg-primary/10 gap-2 aria-[current=true]:bg-primary/10 text-md",
        link: "underline-offset-4 hover:underline text-primary",
        action:
          "bg-brand-gradient transition-opacity border border border-primary/10 bg-origin-border opacity-75 hover:opacity-100 text-white fill-current font-bold",
      },
      size: {
        default: "h-9 py-2 px-5",
        sm: "h-8 px-3 rounded-md",
        lg: "h-10 px-8 rounded-md",
        square: "aspect-square w-9",
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
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

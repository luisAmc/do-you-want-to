import { cva, VariantProps } from "class-variance-authority";
import { ComponentPropsWithRef, forwardRef, type ReactNode } from "react";
import { cn } from "~/utils/cn";

export const inputVariants = cva(
  [
    "w-full bg-transparent border-none [field-sizing:content] resize-none",
    "text-gray-700",
    "focus:outline-none",
    "disabled:pointer-events-none",
    "appearance-none",
  ],
  {
    variants: {
      variant: {
        default: "text-[16px] placeholder:text-[16px]",
        big: "text-[20px] placeholder:text-[16px]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface InputProps
  extends VariantProps<typeof inputVariants>,
    ComponentPropsWithRef<"input"> {
  children?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { type = "text", variant, children, className, ...props },
  ref
) {
  return (
    <label className={cn("p-3 bg-black/5 flex flex-items ", className)}>
      {children}

      <input
        ref={ref}
        type={type}
        className={cn(inputVariants({ variant }))}
        onFocus={(e) => e.target.select()}
        {...props}
      />
    </label>
  );
});

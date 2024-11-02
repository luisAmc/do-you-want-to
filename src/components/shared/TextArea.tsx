import { cva, VariantProps } from "class-variance-authority";
import { ComponentPropsWithRef, forwardRef } from "react";
import { cn } from "~/utils/cn";

const textAreaVariants = cva(
  [
    "p-3 w-full bg-transparent border-none [field-sizing:content] resize-none",
    "text-gray-700 bg-black/5 font-medium",
    "focus:outline-none",
    "disabled:pointer-events-none",
    "appearance-none transition",
  ],
  {
    variants: {
      variant: {
        default: "text-[16px]",
        big: "text-6xl",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface TextAreaProps
  extends VariantProps<typeof textAreaVariants>,
    ComponentPropsWithRef<"textarea"> {}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea({ className, variant, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        className={cn(textAreaVariants({ variant, className }))}
        onFocus={(e) => e.target.select()}
        {...props}
      />
    );
  }
);

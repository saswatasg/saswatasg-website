import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import React from 'react';
import { motion } from 'framer-motion';

const buttonVariants = cva(
  'inline-flex items-center justify-center text-sm font-bold ring-offset-background transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-lg border-2 border-black active:animate-squash',
  {
    variants: {
      variant: {
        default: 'bg-ink text-white px-5 py-2.5 min-h-[44px] gap-2 hover:scale-[1.02] hover:-rotate-[0.5deg]',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'bg-white text-ink px-5 py-2.5 min-h-[44px] gap-2 hover:scale-[1.02] hover:rotate-[0.5deg]',
        secondary: 'bg-pink text-ink px-5 py-2.5 min-h-[44px] gap-2 hover:scale-[1.02] hover:-rotate-[0.5deg]',
        ghost: 'hover:bg-accent hover:text-accent-foreground border-0',
        link: 'text-primary underline-offset-4 hover:underline border-0',
        'ink-pill': 'bg-ink text-white px-5 py-2.5 text-sm font-bold inline-flex items-center gap-2 min-h-[44px] rounded-lg border-2 border-black hover:scale-[1.02] hover:-rotate-[0.5deg]',
        'outline-pill': 'bg-white text-ink px-5 py-2.5 text-sm font-bold inline-flex items-center gap-2 min-h-[44px] rounded-lg border-2 border-black hover:scale-[1.02] hover:rotate-[0.5deg]',
        'yellow-pill': 'bg-lemon text-ink px-5 py-2.5 font-bold min-h-[44px] rounded-lg border-2 border-black hover:scale-[1.02] hover:-rotate-[0.5deg]',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3 text-xs',
        md: 'h-10 px-4 py-2',
        lg: 'h-12 px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = 'Button';

const stackedColors = {
  default: 'bg-pink',
  outline: 'bg-pink',
  secondary: 'bg-purple',
  'ink-pill': 'bg-pink',
  'outline-pill': 'bg-pink',
  'yellow-pill': 'bg-pink',
};

const StackedButton = React.forwardRef(({ className, variant = 'default', size, children, ...props }, ref) => {
  const baseClasses = buttonVariants({ variant, size, className });
  const colorClass = stackedColors[variant] || 'bg-pink';

  return (
    <motion.div
      className="relative inline-flex group"
      whileHover={{ rotate: [0, -2, 2, 0], transition: { duration: 0.3 } }}
      whileTap={{ scale: 0.85, transition: { duration: 0.1 } }}
    >
      <div className={`absolute inset-0 rounded-lg border-2 border-black translate-x-[3px] translate-y-[3px] ${colorClass}`} />
      <button
        ref={ref}
        className={`${baseClasses} relative z-10 transition-transform duration-150 group-hover:translate-x-[3px] group-hover:translate-y-[3px]`}
        {...props}
      >
        {children}
      </button>
    </motion.div>
  );
});
StackedButton.displayName = 'StackedButton';

export { Button, StackedButton, buttonVariants };

import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import React from 'react';
import { motion } from 'framer-motion';

const buttonVariants = cva(
  'inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-ink text-white rounded-pill px-5 py-2.5 font-medium inline-flex items-center gap-2 hover:bg-lemon hover:text-ink',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'bg-white border-2 border-ink text-ink rounded-pill px-5 py-2.5 font-medium uppercase tracking-wide hover:bg-ink hover:text-white',
        secondary: 'bg-lemon text-ink rounded-pill px-5 py-2.5 font-medium hover:bg-lemon/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        'ink-pill': 'bg-ink text-white rounded-pill px-5 py-2.5 text-sm font-medium inline-flex items-center gap-2 hover:bg-lemon hover:text-ink',
        'outline-pill': 'bg-white border-2 border-ink text-ink rounded-pill px-5 py-2.5 text-sm font-medium uppercase tracking-wide hover:bg-ink hover:text-white',
        'yellow-pill': 'bg-lemon text-ink rounded-pill px-5 py-2.5 font-medium hover:bg-lemon/80',
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

const MotionComp = motion(React.forwardRef((props, ref) => {
  const { asChild, ...rest } = props;
  const Comp = asChild ? Slot : 'button';
  return <Comp ref={ref} {...rest} />;
}));

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  return (
    <MotionComp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      asChild={asChild}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      {...props}
    />
  );
});
Button.displayName = 'Button';

export { Button, buttonVariants };

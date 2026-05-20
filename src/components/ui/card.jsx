import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i ? i * 0.1 : 0.1,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

const Card = React.forwardRef(({ className, children, custom, hoverable = false, ...props }, ref) => (
  <motion.div
    ref={ref}
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    custom={custom}
    className={cn(
      'rounded-2xl border bg-card text-card-foreground shadow-sm transition-all duration-300',
      hoverable && 'hover:shadow-md hover:-translate-y-1 hover:border-primary/30 cursor-pointer',
      className
    )}
    {...props}
  >
    {children}
  </motion.div>
));
Card.displayName = 'Card';

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6 md:p-8', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-xl md:text-2xl font-semibold leading-tight tracking-tight text-foreground',
      className
    )}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm md:text-base text-muted-foreground leading-relaxed', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 md:p-8 pt-0 md:pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 md:p-8 pt-0 md:pt-0', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
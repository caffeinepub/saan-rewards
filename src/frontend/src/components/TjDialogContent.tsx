import { DialogContent, DialogPortal, DialogOverlay } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import * as React from 'react';

interface TjDialogContentProps extends React.ComponentPropsWithoutRef<typeof DialogContent> {
  children: React.ReactNode;
  className?: string;
}

/**
 * Standardized dialog content wrapper for Traffic Jam app.
 * Provides consistent width, padding, scroll behavior, and surface styling across all dialogs.
 */
export function TjDialogContent({ children, className, ...props }: TjDialogContentProps) {
  return (
    <DialogPortal>
      <DialogOverlay className="tj-overlay-enter" />
      <DialogContent
        className={cn(
          'max-w-md max-h-[85vh] overflow-y-auto',
          'tj-surface-elevated',
          'tj-dialog-enter',
          'data-[state=closed]:tj-dialog-exit',
          className
        )}
        {...props}
      >
        {children}
      </DialogContent>
    </DialogPortal>
  );
}

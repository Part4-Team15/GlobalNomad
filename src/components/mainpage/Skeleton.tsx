import React from 'react';

interface SkeletonProp {
  className?: string;
  children?: React.ReactNode
}

const Skeleton = ({ className, children }: SkeletonProp) => {
  return (
    <div
      className={`
        relative
        isolate
        overflow-hidden
        before:border-t before:border-gray-80/10
        before:absolute
        before:inset-0
        before:-translate-x-full
        before:animate-shimmer
        before:bg-gradient-to-r
        before:from-transparent
        before:via-gray-10/30
        before:to-transparent
        ${className}
      `}
      style={{ backgroundSize: '40% auto' }}
    >
      {children}
    </div>
  );
};

export default Skeleton;

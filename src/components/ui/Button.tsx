import clsx from 'clsx';
import React, { ButtonHTMLAttributes, DetailedHTMLProps, forwardRef, ReactNode } from 'react';
import Spinner from './Spinner';

interface Props
    extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'warning' | 'danger' | 'success';
    size?: 'sm' | 'md' | 'lg' | 'none';
    outline?: boolean;
    loading?: boolean;
    icon?: React.ReactNode;
    children?: ReactNode;
    className?: string;
}

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
    { className = '',size='md', variant="secondary", outline, loading, icon, children, ...rest },
    ref
) {
    return (
        <button
            ref={ref}
            className={clsx(
                {
                    'bg-brand-500 hover:bg-brand-600 active:bg-brand-600 hover:disabled:bg-brand-500 focus:ring-1 ring-brand-200 text-white ':
                    !outline && variant === 'primary',
                    'bg-zinc-400/60 hover:bg-zinc-300 active:bg-zinc-300  text-black focus:ring-1 ring-brand-200':
                    !outline && variant === 'secondary',
                    'bg-emerald-600 hover:bg-emerald-600/75 active:bg-emerald-600/75  focus:ring-1 ring-emerald-100 text-white':
                    !outline && variant === 'success',
                    'bg-rose-600 hover:bg-rose-600/75 active:bg-rose-600/75  focus:ring-1 ring-rose-100 text-white':
                    !outline && variant === 'danger',
                    
                    'border-brand-500 bg-brand-800/10 hover:bg-brand-800/20 active:bg-brand-600/10 focus:bg-brand-600/10 focus:outline-none focus:ring-0 text-brand-400 ': outline && variant === 'primary',
                    'border-gray-500 bg-gray-600/10 hover:bg-gray-500/10  active:bg-zinc-500/20 focus:bg-gray-500/20 text-gray-400 hover:text-gray-200 hover:border-gray-300  focus:outline-none focus:ring-0 ': outline && variant === 'secondary',
                    'border ':outline,
                    'flex items-center  justify-center gap-2': (icon || loading) && children,
                    'px-3 py-1 text-sm ':size === 'sm',
                    'px-4 py-1.5 text-base':size === 'md',
                    'sm:px-12 px-6 py-2 sm:py-3 sm:text-lg':size === 'lg',
                    '': size === 'none'
                },
                'rounded-md font-medium whitespace-nowrap cursor-pointer  font-display duration-200 ease-out hover:scale-[1.02] disabled:shadow-none disabled:brightness-75  hover:disabled:scale-[1]  active:scale-95  outline-none',
                className
            )}
            disabled={loading}
            {...rest}>
            {icon && !loading && icon}
            {icon && loading && <Spinner size={size === 'lg' ? 'md' : 'sm'} variant={variant} />}
            {!icon && loading && <Spinner size={size === 'lg' ? 'md' : 'sm'} variant={variant}/>}
            {children}
        </button>
    );
});

export default Button;
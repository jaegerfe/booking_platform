import { ComponentProps } from "react";
import { VariantProps, tv } from "tailwind-variants";

const buttonVariants = tv({
    base: 'align-center relative inline-flex select-none items-center justify-center border rounded-md p-2',
    variants: {
        variant: {
            primary: 'bg-button-primary-background text-button-primary-color',
            secondary: 'bg-button-secondary-background text-button-secondary-color',
            danger: 'bg-button-danger-background text-button-danger-color'
        },
        disabled: {
            true: 'cursor-not-allowed opacity-50'
        }
    }
})

type ButtonProps = ComponentProps<'button'> & VariantProps<typeof buttonVariants>

export function Button({ disabled, variant, children, ...otherProps }: ButtonProps) {
    const classes = buttonVariants({ variant, disabled })
    return (
        <button disabled={disabled} type="button" {...otherProps} className={classes}>
            {children}
        </button>
    )
}

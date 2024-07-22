import * as RadixDialog from '@radix-ui/react-dialog';
import { MdClose } from 'react-icons/md';

type DialogProps = {
    title?: string,
    description?: string,
    open?: boolean,
    onOpenChange?(open: boolean): void
}

export function Dialog ({ title, description, open, onOpenChange}: DialogProps) {
    return (
        <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
            {open && <RadixDialog.Portal forceMount>
                <RadixDialog.Overlay asChild>
                    <div className="fixed inset-0 z-30 bg-black/50"/>
                </RadixDialog.Overlay>
                <RadixDialog.Content forceMount asChild>
                    <div className="fixed inset-0 z-30 flex items-center justify-center">
                        <div className='relative w-[calc(100%-2rem)] rounded-2xl border bg-white max-w-xs min-h-24 p-6'>
                            <RadixDialog.Close asChild className='float-end'>
                                <button>
                                    <MdClose />
                                </button>
                            </RadixDialog.Close>
                            {title && <RadixDialog.Title className="text-2xl">{title}</RadixDialog.Title>}
                            {description && (
                                <RadixDialog.Description className="text-base">{description}</RadixDialog.Description>
                            )}
                        </div>
                    </div>
                </RadixDialog.Content>
            </RadixDialog.Portal>}
        </RadixDialog.Root>
    )
}

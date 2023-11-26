import { MouseEventHandler, ReactNode } from 'react';
import variant from '../../utils/styles/variant';
interface ButtonProps {
    children: ReactNode;
    color?: string;
    size?: string;
    rounded?: string;
    border?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>
    type?: 'button' | 'submit';
    className?: string;
    disabled?: boolean;
}


const Button = ({ children, onClick, color = 'darkPr', size = 'md', rounded = 'none', type = 'submit', className = '', disabled = false, border = '' }: ButtonProps) => {
    const buttonStyle = variant(
        'transition-all duration-150',
        {
            color: {
                darkPr: 'bg-darkerMain shadow-md shadow-darkerMain hover:bg-main',
                darkSc: 'bg-darkBlue shadow-md shadow-darkBlue',
                lightPr: 'bg-lightMain shadow-md shadow-darkerMain',
                lightSc: 'bg-lightBlue shadow-md shadow-darkBlue',
            },
            size: {
                lg: 'py-3 px-6',
                md: 'py-3 px-4',
                sm: 'py-2 px-3',
            },
            rounded: {
                xl: 'rounded-xl',
                txl: 'rounded-t-xl',
                tlxl: 'rounded-tl-xl',
                trxl: 'rounded-tr-xl',
                bxl: 'rounded-b-xl',
                blxl: 'rounded-bl-xl',
                brxl: 'rounded-br-xl',
                none: 'rounded-none',
                lxl: 'rounded-l-xl',
                rxl: 'rounded-r-xl',
            },
            border: {
                pr: 'border-2 border-bInput ',
                sc: 'border-2 border-bCard ',
            }
        },
    )



    return (
        <button type={type} disabled={disabled} className={`${buttonStyle({ color, size, rounded, border })} ${className}`} onClick={onClick}>{children}</button>

    )
}

export default Button

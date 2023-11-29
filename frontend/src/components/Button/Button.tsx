import React, { ButtonHTMLAttributes } from 'react';
import './Button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: React.ReactNode;
    children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ icon, children, className, type = 'button', ...props }) => {
    return (
        <button className={`Button ${className}`} type={type} {...props}>
            {icon}
            {children}
        </button>
    );
};

export default Button;

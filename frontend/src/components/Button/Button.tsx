import React, { ButtonHTMLAttributes } from 'react';
import './Button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: React.ReactNode;
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ icon, children, className, ...props }) => {
    return (
        <button className={`Button ${className}`} {...props}>
            {icon && <span className="Button-icon">{icon}</span>}
            <span className='Button-children'>{children}</span>
        </button>
    );
};

export default Button;

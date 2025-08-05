import React from "react";
import style from "./Button.module.css";

interface ButtonProps {
    text: string;
    type: string;
    icon?: React.ElementType<{ size: number}>;
    onClick?: () => void;
}
const Button: React.FC<ButtonProps> = ({ text, type, onClick, icon: Icon }) => {
    return (
        <button className={`${style.button} ${style[type]}`} onClick={onClick}>
            {Icon && <Icon size={20} style={{ marginRight: '5px'}} />}
            {text}
        </button>
    )
};

export default Button;
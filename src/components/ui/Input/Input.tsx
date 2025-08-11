import React from 'react';
import style from './Input.module.css';

interface InputProps {
    value?: any;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    width?: number;
}
const Input: React.FC<InputProps> = ({ value, onChange, width }) => {
    return (
        <input style={{ width: `${width}px` }} className={style.input} type="text" value={value} onChange={onChange} />
    )
};

export default Input;
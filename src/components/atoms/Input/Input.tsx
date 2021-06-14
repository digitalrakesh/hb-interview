import React from 'react';

interface InputProps{
    label?: string;
    type?: string;
    placeholder?: string;
    defaultValue?: string;
    readOnly?: boolean;
    disabled?: boolean;
    className?: string;
}

const Input:React.FC<InputProps> = ({label, type, defaultValue, placeholder, disabled, readOnly, className}) =>{
    return(
        <div className='field'>
                <label>{label}</label>
                <input 
                type={type}
                disabled={disabled}
                readOnly={readOnly}
                placeholder={placeholder}
                defaultValue={defaultValue}
                className={className}
                />
                </div>
    )
}

Input.defaultProps={
    type: 'text'
}

export default Input;
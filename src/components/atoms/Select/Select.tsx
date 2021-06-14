import React from 'react';

interface SelectProps{
    label?: string;
    value?: string;
    children: any;
    defaultValue?: any;
    onChange?: any;
}

const Select:React.FC<SelectProps> =({label, children, defaultValue, onChange})=>{
    return(
        <div className="field">
                <label>{label}</label>
                <select
                defaultValue={defaultValue}
                onChange={onChange}
                >
                        {children}
                </select>
                </div>
    )
}
export default Select;
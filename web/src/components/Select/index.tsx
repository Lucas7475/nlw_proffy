import React, {SelectHTMLAttributes} from 'react';

import './styles.css';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    nome: string;
    options: Array<{
        value: string;
        label: string;
    }>;
}

const Select: React.FC<SelectProps> = ({label, nome, options, ...rest}) =>{
    return(
        <div className="select-block">
            <label htmlFor={nome}>{label}</label>
            <select value="" id={nome} {...rest}>
                <option value="" disabled hidden>Selecione uma opção</option>
                {options.map(op =>{
                    return <option key={op.value} value={op.value}>{op.label}</option>
                })}
            </select>
        </div>  
    )
}

export default Select;
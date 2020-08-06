import React, {TextareaHTMLAttributes} from 'react';

import './styles.css';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    nome: string;

}

const Textarea: React.FC<TextareaProps> = ({label, nome, ...rest}) =>{
    return(
        <div className="textarea-block">
            <label htmlFor={nome}>{label}</label>
            <textarea id={nome} {...rest}/>
        </div>  
    )
}

export default Textarea;
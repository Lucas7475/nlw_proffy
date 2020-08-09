import React from "react";

import whatsapp from '../../assets/images/icons/whatsapp.svg';
import api from "../../services/api";

import './styles.css';

export interface Teacher{
        id: number;
        avatar: string;
        bio: string;
        cost: number;
        nome: string;
        subjet: string;
        whatsapp: string;
}
interface TeacherProps{
    teacher: Teacher;
}

const TeacherItem: React.FC<TeacherProps> = ({ teacher }) => {

    function createNewConnection(){
        api.post('/connections',{
            user_id: teacher.id
        })
    }

    return(
        <article className="teacher-item">
            <header>
                <img src={teacher.avatar} alt={teacher.nome}/>
                <div>
                    <strong>{teacher.nome}</strong>
                    <span>{teacher.subjet}</span>
                </div>
            </header>

            <p>{teacher.bio}</p>

            <footer>
                <p>
                    Preço/hora
                    <strong>R$ {teacher.cost}</strong>
                </p>
                <a 
                    href={`https://wa.me/${teacher.whatsapp}`}
                    target="blank"
                    onClick={createNewConnection} 
                >
                    <img src={whatsapp} alt="whatsapp"/>
                    Entrar em contato
                </a>
            </footer>
        </article>
    )
}

export default TeacherItem;
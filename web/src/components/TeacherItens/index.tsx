import React from "react";

import whatsapp from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

function TeacherItem () {
    return(
        <article className="teacher-item">
            <header>
                <img src="https://avatars2.githubusercontent.com/u/56143109?s=460&u=41d8024997f819282f2fbe6a43b4c2bb6e8fe2fd&v=4" alt=""/>
                <div>
                    <strong>Lucas Matheus</strong>
                    <span>Matemática</span>
                </div>
            </header>

            <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                <br/> <br/>
                Nulla culpa placeat officiis? Ad, ex ullam modi suscipit architecto dolorum fugiat nostrum delectus
                odio natus officia magni voluptates, hic nihil nam.
            </p>

            <footer>
                <p>
                    Preço/hora
                    <strong>R$ 50,00</strong>
                </p>
                <button>
                    <img src={whatsapp} alt="whatsapp"/>
                    Entrar em contato
                </button>
            </footer>
        </article>
    )
}

export default TeacherItem;
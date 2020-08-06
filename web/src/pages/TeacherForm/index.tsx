import React, {useState, FormEvent} from 'react';
import { useHistory } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/TextArea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css'
import api from '../../services/api';

function TeacherForm (){

    const history = useHistory();

    const [nome, setNome] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsApp] = useState('');
    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    const [ scheduleItens, setScheduleItens ] = useState([
        {week_day: 0, from:'', to:''}
    ])

    function addNewScheduleItem(){
        setScheduleItens([
            ...scheduleItens,
            {week_day: 0, from:'', to:''}
        ])
    }

    function setItemValue(posicion: number, field: string, value: string){
        const updateScheduleItens = scheduleItens.map((item, index) =>{
            if(index === posicion){
                return {...item, [field]: value};
            }
            
            return item;
        })

        setScheduleItens(updateScheduleItens);
    }

    function handleCreateClass(event: FormEvent){
        event.preventDefault();

        api.post('classes',{
            nome,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItens
        }).then(()=>{
            alert("Cadastro realizado com sucesso!")

            history.push('/');
        }).catch(()=>{
            alert("Erro no cadastro!")
        })
    }


    return(
        <div id="page-teacher-form" className="container">
            <PageHeader 
                title="Que incrível que você quer dar aulas."
                descricao="O primeiro passo é preencher esse formulário  de inscrição"
            />

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>

                        <Input 
                            nome="nome"
                            label="Nome completo"
                            value={nome}
                            onChange={(x) =>{setNome(x.target.value)}}
                        />
                        <Input 
                            nome="avatar"
                            label="Avatar"
                            value={avatar}
                            onChange={(x) =>{setAvatar(x.target.value)}}
                        />
                        <Input 
                            nome="whatsapp"
                            label="WhatsApp"
                            value={whatsapp}
                            onChange={(x) =>{setWhatsApp(x.target.value)}}
                        />
                        <Textarea 
                            nome="bio"
                            label="Biografia"
                            value={bio}
                            onChange={(x) =>{setBio(x.target.value)}}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>

                        <Select 
                            nome="subject"
                            label="Matéria"
                            value={subject}
                            onChange={(x)=> {setSubject(x.target.value)}}
                            options={[
                                {value: 'Artes', label:'Artes'},
                                {value: 'Biologia', label:'Biologia'},
                                {value: 'Matemática', label:'Matemática'},
                                {value: 'Física', label: 'Física'},
                                {value: 'Química', label:'Química'},
                                {value: 'Português', label:'Português'},
                                {value: 'História', label:'História'},
                                {value: 'Geografia', label:'Geografia'},
                            ]}
                        />
                        <Input 
                            nome="cost"
                            label="Custo da sua hora por aula"
                            value={cost}
                            onChange={(x) =>{setCost(x.target.value)}}
                        />

                    </fieldset>

                    <fieldset>
                            <legend>Horários disponiveis
                                <button type="button" onClick={addNewScheduleItem}>
                                    + Novo horário
                                </button>
                            </legend>

                            {scheduleItens.map((item, index) =>{
                                return(
                                    <div key={item.week_day} className="schedule-item">
                                        <Select 
                                            nome="week_day"
                                            label="Dia da semana"
                                            value={item.week_day}
                                            onChange={(x)=> setItemValue(index, 'week_day', x.target.value )}
                                            options={[
                                                {value: '0', label:'Domingo'},
                                                {value: '1', label:'Segunda-Feira'},
                                                {value: '2', label:'Terça-Feira'},
                                                {value: '3', label: 'Quarta-Feira'},
                                                {value: '4', label:'Quinta-Feira'},
                                                {value: '5', label:'Sexta-Feira'},
                                                {value: '6', label:'Sábado'},
                                            ]}
                                        />

                                        <Input 
                                            nome="from" 
                                            label="Das"
                                            type="time"
                                            value={item.from}
                                            onChange={(x)=> setItemValue(index, 'from', x.target.value )}
                                        />
                                        <Input 
                                            nome="to" 
                                            label="Até" 
                                            type="time"
                                            value={item.to}
                                            onChange={(x)=> setItemValue(index, 'to', x.target.value )}
                                        />
                                    </div>
                                )
                            })}
                    </fieldset>
                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso Importante"/>
                            Importante! <br/>
                            Preencha todos os dados
                        </p>
                        <button type="submit">Salvar cadastro</button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default TeacherForm;
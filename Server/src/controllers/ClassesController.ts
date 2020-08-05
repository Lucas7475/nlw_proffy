import {Request, Response} from 'express'

import db from '../database/connection';
import converteHrsEmMin from '../utils/converteHrsEmMin';

interface scheduleItem{
    week_day: number,
    from: string,
    to: string
}

export default class ClassesController {
    async index (req:Request, res: Response){
        const filters = req.query;

        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;

        if(!filters.week_day || !filters.subject || !filters.time){
            return res.status(400).json({
                error: "Faltou filtros na busca por classes"
            })
        }

        const tempoEmMin = converteHrsEmMin(time);

        const classes = await db('classes')
            .whereExists(function(){
                this.select('class_schedule.*')
                .from('class_schedule')
                .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                .whereRaw('`class_schedule`.`week_day` = ??',[Number(week_day)])
                .whereRaw('`class_schedule`.`from` <= ??', [tempoEmMin])
                .whereRaw('`class_schedule`.`from` > ??', [tempoEmMin])
            })
            .where('classes.subject', '=', subject)
            .join('users', 'classes.user_id', '=', 'users.id')
            .select(['classes.*', 'users.*']);

        return res.json(classes);
    }

    async create (req: Request, res: Response){
        const {
            nome,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = req.body;
    
        const trx = await db.transaction();
    
        try{
            const idsUsuarios = await trx('users').insert({nome,avatar,whatsapp,bio});
    
            const user_id = idsUsuarios[0];
    
            const idsClasses = await trx('classes').insert({subject, cost, user_id});
            
            const class_id = idsClasses[0];
    
            const classSchedule = schedule.map((item: scheduleItem) =>{
                return {
                    class_id,
                    week_day: item.week_day,
                    from: converteHrsEmMin(item.from),
                    to: converteHrsEmMin(item.to)
                };
            })
    
            await trx('class_schedule').insert(classSchedule);
    
            await trx.commit();
    
            return res.status(201).send();
    
        }catch (err){
    
            await trx.rollback();
    
            return res.status(400).json({
                error:'Ocorreu um erro inesperado durante a criação da classe.'
            })
        }
    }
}
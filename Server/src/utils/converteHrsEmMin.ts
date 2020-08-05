export default function converteHrsEmMin (time: string){
    
    const [horas, minutos] = time.split(':').map(Number);

    const tempoEmMin = (horas * 60) + minutos;

    return tempoEmMin;
}
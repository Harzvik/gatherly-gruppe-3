/*Alex Harsvik*/

export function formatDate(dateString: string): string {
    if (!dateString) return "";
    
    //bytt ut eventuell mellomrom hvis datoen er YYYY-MM-DD HH:MM med 'T'
    const normalizedString = dateString.replace(' ', 'T');
    
    if (normalizedString.includes('T')) {
        const [date, time] = normalizedString.split('T');
        const [year, month, day] = date.split('-');
        const [hours, minutes] = time.split(':');
        
        return `${day}.${month}.${year} ${hours}:${minutes}`;
    }
    
    //hvis det bare er en dato uten tid
    if (dateString.includes('-')) {
        const [year, month, day] = dateString.split('-');
        return `${day}.${month}.${year}`;
    }
    
    return dateString;
}

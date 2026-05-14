/*Alex Harsvik*/

export function formatDate(dateString: string): string {
    if (!dateString || !dateString.includes('T')) return "";
    
    const [date, time] = dateString.split('T');
    const [year, month, day] = date.split('-');
    const [hours, minutes] = time.split(':');
    
    return `${day}.${month}.${year} ${hours}:${minutes}`;
}

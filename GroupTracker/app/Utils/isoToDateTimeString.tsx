export default function isoToDateTimeString(isoString: string) {
    const date = new Date(isoString);

    const formattedDate = date.toLocaleString('en-GB', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
    return formattedDate
}
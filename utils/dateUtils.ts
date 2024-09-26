export function timeAgo(dateInput: string | Date): string {
    const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
    const now = new Date();
    const secondsPast = (now.getTime() - date.getTime()) / 1000;
  
    if (secondsPast < 60) {
        return `${Math.round(secondsPast)}s ago`;
    }
    if (secondsPast < 3600) {
        return `${Math.round(secondsPast / 60)}m ago`;
    }
    if (secondsPast <= 86400) {
        return `${Math.round(secondsPast / 3600)}h ago`;
    }
    if (secondsPast <= 2592000) {
      return `${Math.round(secondsPast / 86400)}d ago`;
    }
    if (secondsPast <= 31536000) {
        return `${Math.round(secondsPast / 2592000)}mo ago`;
    }

    return `${Math.round(secondsPast / 31536000)}y ago`;
}
  
export function formatDate(dateInput: string | Date): string {
    const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
}
  
export function formatBirthday(dateInput: string | Date | null | undefined): string {
    if (!dateInput) return 'not set';
    const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getUTCDate();
    return `${day} ${month}`;
}
  
export function formatDateLong(dateInput: string | Date): string {
    const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
    const dayOfWeek = date.toLocaleDateString('en-US', {
        weekday: 'short',
        timeZone: 'UTC',
    });
  
    const month = date.toLocaleString('en-US', { month: 'long', timeZone: 'UTC' });
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();
  
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert '0' to '12'
  
    return `${dayOfWeek}, ${month.toUpperCase()} ${day}, ${year}, ${hours}:${minutes}${ampm}`;
}
  
export function formatDateWithoutTime(dateInput: string | Date): string {
    const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
    const formattedDate = date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC',
    }).toUpperCase();

    return formattedDate;
}
  
export function extractTimeFromDate(dateInput: string | Date): string {
    const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert '0' to '12'
    return `${hours}:${minutes}${ampm}`;
}
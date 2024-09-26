export const shortenString = (str:any, maxLength:number) => {
    if (str.length <= maxLength) {
        return str;
    }
    return str.substring(0, maxLength) + '...';
};
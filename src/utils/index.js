import { monthNamesShort } from './lists';

export const reduceStringLength = (str = '', numberToReduce = 0) => {
    return str.length > numberToReduce ? `${str.substring(0, numberToReduce)}...` : str;
}

export const formatDate = (date = new Date()) => {
    const day = date.getDate();
    const month = monthNamesShort[date.getMonth()];
    let hours = date.getHours();
    let minutes = date.getMinutes();

    if(`${hours}`.length === 1) {
        hours = `0${hours}`;
    }
    if(`${minutes}`.length === 1) {
        minutes = `0${minutes}`;
    }

    return `${day} ${month}, ${hours}:${minutes}`;
}

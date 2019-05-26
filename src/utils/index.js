import { monthNamesShort } from './lists';

export const reduceStringLength = (str = '', numberToReduce = 0) => {
    return str.length > numberToReduce ? `${str.substring(0, numberToReduce)}...` : str;
}

export const formatDate = (date = new Date()) => {
    const day = date.getDate();
    const month = monthNamesShort[date.getMonth()];
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${hours}:${minutes} ${day} ${month}`;
}
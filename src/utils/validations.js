export const required = (value, errorMsg = 'Необходимо ввести!') => {
    if(!value) return errorMsg;
    return null;
}
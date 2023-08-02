export const getShortNameOfDay = async (timestamp) => {
    return new Date(timestamp * 1000).toString().split(' ')[0];
}
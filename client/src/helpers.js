export const getShortNameOfDay = async (timestamp) => {
    return new Date(timestamp * 1000).toString().split(' ')[0];
}

export const getAppropriateIcon = (weather, descr) => {
    let icon;

    Object.keys(weather).map((key, value) => {
        if (descr.toLowerCase().includes(key)) {
            icon = weather[key];
        }
    });

    return icon;
}

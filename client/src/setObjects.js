export const setBaseInfo = (data) =>  {
    return {
      type: 'SET_BASEINFO',
      payload: data
    }
};

export const setForecastCity = (data) => {
  return {
    type: 'SET_CITY',
    payload: data
  }
}
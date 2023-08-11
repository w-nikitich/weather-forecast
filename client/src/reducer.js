export const defaultState = {
  forecastData: {
    forecastBaseInfo: null,
    forecastCity: null
  }
}

export const reducer = (state = defaultState, action) => {
    switch (action.type) {
      case 'SET_BASEINFO':
        return {
          ...state,
          forecastData: {
            ...state.forecastData, 
            forecastBaseInfo: action.payload
          }
        }
        case 'SET_CITY':
          return {
            ...state,
            forecastData: {
              ...state.forecastData,
              forecastCity: action.payload
            }
          }
      default:
        return state
    }
  }
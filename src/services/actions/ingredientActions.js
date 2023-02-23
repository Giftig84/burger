export const INGREDIENTS_REQUEST = "GET_INGREDIENT";
export const SET_DETAILS = "SET_DETAILS";
export const UNSET_DETAILS = "UNSET_DETAILS";
export const INCREMENT_COUNTER = "INCREMENT_COUNTER";
export const DECREMENT_COUNTER = "DECREMENT_COUNTER";
export const SET_CURRENT = "SET_CURRENT";

export const setModalDetailsAction = (payload) => ({ type: SET_DETAILS, payload });
export const unsetModalDetailsAction = (payload) => ({ type: UNSET_DETAILS, payload });
export const incrementCounterAction = (payload) => ({ type: INCREMENT_COUNTER, payload });
export const decrementCounterAction = (payload) => ({ type: DECREMENT_COUNTER, payload });
export const setCurrentTabAction = (payload) => ({ type: SET_CURRENT, payload });


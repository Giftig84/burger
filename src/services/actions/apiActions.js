import {BASE_URL} from "../../ImportFiles/endPointUrl";
import {checkResponse} from "../../Utils/Utils";
import {CLEAR_ORDER} from "./constructorActions";
export const SET_STATUS = "SET_STATUS";


export const setStatusAction = (payload) => ({ type: SET_STATUS, payload });

export const fetchRequest = (url, body, actionType) =>{
    return async function(dispatch) {
        try{
            const parsedResponse = await fetch(BASE_URL + url, body).then(checkResponse);
            let request = {type: actionType, payload: {response: parsedResponse }};
            await dispatch(request);
            dispatch(setStatusAction({hasError: false, isLoading: false}));
        } catch (e) {
            dispatch(setStatusAction({hasError: true, isLoading: false }));
            console.log('Возникла проблема с вашим запросом: ' + actionType, e.message);
            dispatch({type: CLEAR_ORDER});
        }
    }
}

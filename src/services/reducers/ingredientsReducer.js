import {
    DECREMENT_COUNTER, INGREDIENTS_SUCCESS, INCREMENT_COUNTER,
    SET_DETAILS, UNSET_DETAILS, SET_CURRENT, CLEAR_INGREDIENT, INGREDIENTS_REQUEST, INGREDIENTS_ERROR
} from "../actions/ingredientActions";


const defaultState = {
    arrIngredient: [],
    modalDetails: {},
    isModal: false,
    currentTab: "bun"
}

export const ingredientsReducer= (state = defaultState, action) => {
    let arr;
    let index;
    switch (action.type) {
        case INGREDIENTS_REQUEST:
            return {...state, isLoading: true, hasError: false };

        case INGREDIENTS_SUCCESS:
            return {...state, arrIngredient: [...action.payload.response.data], isLoading: false, hasError: false};

        case INGREDIENTS_ERROR:
            return {...state, isLoading: false, hasError: true };

        case CLEAR_INGREDIENT:
            return {...state, arrIngredient: []};

        case SET_DETAILS:
            return {...state, modalDetails: action.payload, isModal: true};

        case UNSET_DETAILS:
            return {...state, modalDetails: {}, isModal: false};

        case INCREMENT_COUNTER:
            //копируем массив
            arr = [ ...state.arrIngredient];
            //ищем элемент по индеку
            index = arr.findIndex((el => el._id === action.payload));
            // проверяем есть ли свойство, если да то инкриментируем его
            arr[index] = (arr[index].count !== undefined) ? ({...arr[index], count: Number(arr[index].count)+1}):({...arr[index], count: 1}) ;
            return {...state, arrIngredient: arr};

        case DECREMENT_COUNTER:
            //копируем массив
            arr = [ ...state.arrIngredient];
            //ищем элемент по индеку
            index = arr.findIndex((el => el._id === action.payload));
            // проверяем есть ли свойство, если да то декриментируем его
            arr[index] = (arr[index].count >0 ) && ({...arr[index], count: Number(arr[index].count)-1}) ;
            return {...state, arrIngredient: arr};

        case SET_CURRENT:
            return {...state, currentTab: action.payload};

        default:
            return state;
    }
}
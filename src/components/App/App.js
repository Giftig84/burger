import React from 'react';

import AppHeader from '../AppHeader/AppHeader';
import s from './app.module.css'
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import {IngredientContext} from "../../ImportFiles/IngredientContext";
import {checkResponse} from "../../Utils/Utils";
import {BASE_URL} from "../../ImportFiles/endPointUrl";
import ClipLoader from "react-spinners/ClipLoader";

function App () {
    const [ingredient, setArrIngredient] = React.useState({
        isLoading: false,
        hasError: false,
        arrIngredient: []
    });
    //эмуляция заказа
    const [order, setOrder] = React.useState({
            arrIngredient: []
    });

    React.useEffect(()=>{
        try{
            const getIngr = async () => {
                setArrIngredient(({ ...ingredient, hasError: false, isLoading: true }));
                const parsedResponse  = await fetch(BASE_URL + "/ingredients").then(checkResponse);
                setArrIngredient({ ...ingredient, arrIngredient: parsedResponse.data, isLoading: false });
                setOrder({ arrIngredient: parsedResponse.data});
            };
            getIngr();
        } catch (e) {
            setArrIngredient(({ ...ingredient, hasError: true, isLoading: false }));
            console.log('Возникла проблема с вашим fetch запросом: ', e.message);
        }


    },[])
        return (
            <div className={s.app}>
                {ingredient.isLoading &&
                    <ClipLoader className={s.loader}
                        color="#4C4CFF"
                        loading={ingredient.isLoading}
                        size={250}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />}
                <AppHeader/>
                <IngredientContext.Provider value={{order, setOrder}}>
                    <main className={s.main}>
                            <BurgerIngredients arrIngredient={ingredient.arrIngredient} />
                            <BurgerConstructor />
                    </main>
                </IngredientContext.Provider>
            </div>
        );

}
export default App;
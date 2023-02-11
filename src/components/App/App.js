import React, {useState} from 'react';

import AppHeader from '../AppHeader/AppHeader';
import s from './app.module.css'
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

function App () {
    const urlData = "https://norma.nomoreparties.space/api/ingredients";

    const [ingredient, setArrIngredient] = React.useState({
        isLoading: false,
        hasError: false,
        arrIngredient: []
    });

    React.useEffect(()=>{
        try{
            const getIngr = async () => {
                setArrIngredient(({ ...ingredient, hasError: false, isLoading: true }));
                const response = await fetch(urlData);
                if (!response .ok) {
                    throw new Error('Ошибка получениия данных');
                }
                const parsedResponse = await response.json();
                setArrIngredient({ ...ingredient, arrIngredient: parsedResponse.data, isLoading: false });

            };
            getIngr();
        } catch (e) {
            setArrIngredient(({ ...ingredient, hasError: true, isLoading: false }));
            console.log('Возникла проблема с вашим fetch запросом: ', e.message);
        }


    },[])
        return (
            <div className={s.app}>
                <AppHeader/>
                <main className={s.main}>
                        <BurgerIngredients arrIngredient={ingredient.arrIngredient} />
                        <BurgerConstructor arrIngredient={ingredient.arrIngredient} />
                </main>
            </div>
        );

}
export default App;
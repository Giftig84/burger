import React, {useState} from 'react';

import AppHeader from '../AppHeader/AppHeader';
import s from './app.module.css'
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

function App () {
    const urlData = "https://norma.nomoreparties.space/api/ingredients";

    const [state, setState] = React.useState({
        isLoading: false,
        hasError: false,
        data: []
    });

    React.useEffect(()=>{
        const getIngr = async () => {
            setState({ ...state, hasError: false, isLoading: true });
            const res = await fetch(urlData);
            const d = await res.json();
            setState({ ...state, data: d.data, isLoading: false });
        };
        getIngr();
    },[])
        return (
            <div className={s.app}>
                <AppHeader/>
                <main className={s.main}>
                        <BurgerIngredients data={state.data} />
                        <BurgerConstructor data={state.data} />
                </main>
            </div>
        );

}
export default App;
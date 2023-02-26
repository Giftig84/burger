import React from 'react';

import AppHeader from '../AppHeader/AppHeader';
import s from './app.module.css'
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import ClipLoader from "react-spinners/ClipLoader";
import {useDispatch, useSelector} from "react-redux";
import {fetchIngredientRequest, INGREDIENTS_REQUEST} from "../../services/actions/ingredientActions";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {isLoadingSelector} from "../../services/selectors/selectors";

function App () {

    const dispatch = useDispatch();
    const isLoading = useSelector(isLoadingSelector);

    React.useEffect(()=>{
        dispatch({type: INGREDIENTS_REQUEST});
        dispatch(fetchIngredientRequest("/ingredients"));
    },[]);

        return (
            <div className={s.app}>
                {isLoading &&
                    <ClipLoader className={s.loader}
                        color="#4C4CFF"
                        loading={isLoading}
                        size={250}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />}
                <AppHeader/>
                    <main className={s.main}>
                        <DndProvider backend={HTML5Backend}>
                            <BurgerIngredients />
                            <BurgerConstructor />
                        </DndProvider>
                    </main>
            </div>
        );
}
export default App;
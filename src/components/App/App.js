import React from 'react';

import AppHeader from '../AppHeader/AppHeader';
import s from './app.module.css'
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import {data} from '../../utils/data';

class App extends React.Component {
    render() {
        return (
            <div className={s.app}>
                <AppHeader/>
                <main className={s.main}>
                        <BurgerIngredients data={data} />
                        <BurgerConstructor data={data} />
                </main>
            </div>
        );
    }
}
export default App;
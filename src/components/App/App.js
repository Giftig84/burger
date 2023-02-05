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
                    <div className={"mr-5"}>
                        <BurgerIngredients data={data} />
                    </div>
                    <div className={"ml-5"}>
                        <BurgerConstructor data={data} />
                    </div>
                </main>

            </div>
        );
    }
}

export default App;
import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import  s from './Tabs.module.css';
import {useDispatch, useSelector} from "react-redux";
import {setCurrentTabAction} from "../../../services/actions/ingredientActions";

function Tabs ({sauce, bun, main}){

    const clickScroll = (ref) => {
        return ref.current.scrollIntoView({ behavior: "smooth"});
    }
    const current = useSelector(state => state.ingr.currentTab)
    const dispatch = useDispatch();

    return(
        <div className={s.tab + " mt-5"}>
            <Tab value="bun" active={current === 'bun'} onClick={()=>{dispatch(setCurrentTabAction('bun')); clickScroll(bun);}}>
                Булки
            </Tab>
            <Tab value="sauce" active={current === 'sauce'} onClick={()=>{dispatch(setCurrentTabAction('sauce')); clickScroll(sauce);}}>
                Соусы
            </Tab>
            <Tab value="main" active={current === 'main'} onClick={()=>{dispatch(setCurrentTabAction('main')); clickScroll(main);}}>
                Начинки
            </Tab>
        </div>
    )
}

export default Tabs;
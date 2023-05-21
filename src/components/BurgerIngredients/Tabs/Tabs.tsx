import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import  s from './Tabs.module.css';
import {setCurrentTabAction} from "../../../services/actions/ingredientActions";
import {currentTabSelector} from "../../../services/selectors/selectors";
import {useAppDispatch, useAppSelector} from "../../../Types/types";

type TProps = {
    sauce: React.RefObject<HTMLDivElement>;
    bun: React.RefObject<HTMLDivElement>;
    main: React.RefObject<HTMLDivElement>;
}

const  Tabs: React.FC<TProps> =  ({sauce, bun, main})=>{

    const clickScroll = (ref:React.RefObject<any>) => {
        return ref.current.scrollIntoView({ behavior: "smooth"});
    }
    const current = useAppSelector(currentTabSelector)
    const dispatch = useAppDispatch();

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
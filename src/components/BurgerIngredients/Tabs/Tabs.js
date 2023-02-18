import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import  s from './Tabs.module.css';

function Tabs ({souce, bun, main}){
    const [current, setCurrent] = React.useState('one');
    const clickScroll = (ref) => {
        return ref.current.scrollIntoView({ behavior: "smooth"});
    }

    return(
        <div className={s.tab + " mt-5"}>
            <Tab value="one" active={current === 'one'} onClick={()=>{setCurrent('one'); clickScroll(bun);}}>
                Булки
            </Tab>
            <Tab value="two" active={current === 'two'} onClick={()=>{setCurrent('two'); clickScroll(souce);}}>
                Соусы
            </Tab>
            <Tab value="three" active={current === 'three'} onClick={()=>{setCurrent('three'); clickScroll(main);}}>
                Начинки
            </Tab>
        </div>
    )
}

export default Tabs;
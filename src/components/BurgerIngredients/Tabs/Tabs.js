import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import  s from './Tabs.module.css';
import PropTypes from 'prop-types';

function Tabs (props){

    return(
        <div className={s.tab + " mt-5"}>
            <Tab value="one" >
                Булки
            </Tab>
            <Tab value="two" >
                Соусы
            </Tab>
            <Tab value="three" >
                Начинки
            </Tab>
        </div>
    )
}

export default Tabs;
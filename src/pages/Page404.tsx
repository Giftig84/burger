import React, {FC} from 'react';
import  s from './Page.module.css'

export const Page404:FC = () =>{
    return(
        <p className={s.page404 + " pt-30 text text_type_main-large"}>СТРАНИЦА НЕ НАЙДЕНА 404</p>
    )
}
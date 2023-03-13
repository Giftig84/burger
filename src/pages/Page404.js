import React from 'react';
import  s from './Page.module.css'

export function Page404 (){
    return(
        <p className={s.page404 + " pt-30 text text_type_main-large"}>СТРАНИЦА НЕ НАЙДЕНА 404</p>
    )
}
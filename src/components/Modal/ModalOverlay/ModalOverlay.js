import React from 'react';
import s from "./ModalOverlay.module.css"

function ModalOverlay (props){

    return(
        <div className={s.modOverlay} onClick={props.closeModal}>
        </div>
    )
}
export default  ModalOverlay;
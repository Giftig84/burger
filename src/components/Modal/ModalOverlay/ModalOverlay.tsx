import React, {FC} from 'react';
import s from "./ModalOverlay.module.css"
type TProps = {
    closeModal: (T: React.MouseEvent)=>void;
}
const  ModalOverlay: FC<TProps> =  (props) =>{

    return(
        <div className={s.modOverlay} onClick={props.closeModal}>
        </div>
    )
}
export default  ModalOverlay;
import React from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ReactDOM from 'react-dom';
import  s from "./Modal.module.css"
import ModalOverlay from "./ModalOverlay/ModalOverlay";

const modalRoot = document.getElementById("modal");

function Modal (props){
    const { children, closeModal } = props;
    React.useEffect(()=>{
        const closeByEsc = ((e) => {
           if(e.key === 'Escape')  closeModal(e);
            });
        document.addEventListener('keydown', closeByEsc);
        return () => document.removeEventListener('keydown', closeByEsc)
    }, [closeModal]);

    return ReactDOM.createPortal (
        (
            <>
                <ModalOverlay closeModal={closeModal} />
                <div className={s.modal}>
                    <div className={s.img}>
                        <CloseIcon type='primary' onClick={closeModal} />
                    </div>
                    {children}
                </div>
            </>
        ),
        modalRoot
    )
}
export default Modal
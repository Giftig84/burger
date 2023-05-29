import React, {FC} from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ReactDOM from 'react-dom';
import  s from "./Modal.module.css"
import ModalOverlay from "./ModalOverlay/ModalOverlay";

const modalRoot:  Element | DocumentFragment = document.getElementById("modal") as HTMLDivElement;

type TProps = {
    closeModal: ()=>void;
    children?: React.ReactNode;
}

const Modal:FC<TProps> = (props)=>{
    const { children, closeModal } = props;
    React.useEffect(()=>{
        const closeByEsc = ((key: KeyboardEvent) => {
           if(key.key === 'Escape')  closeModal();
            });
        document.addEventListener('keydown', closeByEsc);
        return () => document.removeEventListener('keydown', closeByEsc)
    }, [closeModal]);

    return ReactDOM.createPortal (
        (
            <>
                <ModalOverlay closeModal={closeModal} />
                <div className={s.modal}>
                    <div className={s.img}  data-test="closeWindow">
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
import React, {FC} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import IngredientDetails from "../components/BurgerIngredients/IngredientDetails/IngredientDetails";
import {fetchModalIngredientRequest, unsetModalDetailsAction} from "../services/actions/modalDetailsActions";
import Modal from "../components/Modal/Modal";
import { useAppDispatch} from "../Types/types";

export const Full:FC = () =>{
    const {id} = useParams();
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    let background = location.state && location.state.background;

    const handleModalClose = ():void => {
        dispatch(unsetModalDetailsAction());
        navigate(-1);
    };
    //получаем ингредиент по Id в store
    dispatch(fetchModalIngredientRequest(id));

    return (
        <>
            {background ? (<Modal closeModal={handleModalClose}> <IngredientDetails /> </Modal>) : (<IngredientDetails />)}
        </>
    )
}
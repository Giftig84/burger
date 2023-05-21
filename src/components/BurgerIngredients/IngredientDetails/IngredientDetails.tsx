import React, {FC, useEffect} from 'react';
import  s from './IngredientDetails.module.css'
import {ingredientsModalSelector} from "../../../services/selectors/selectors";
import { useAppDispatch, useAppSelector} from "../../../Types/types";
import {fetchModalIngredientRequest} from "../../../services/actions/modalDetailsActions";
import {useParams} from "react-router-dom";

const IngredientDetails: FC = () => {
    const details = useAppSelector(ingredientsModalSelector);
    const dispatch = useAppDispatch();
    const {id} = useParams();
    useEffect(() => {
        dispatch(fetchModalIngredientRequest(id));
    }, []);
    if (details)
        return (
        <div className={s.main}>
            <div className={s.header +" ml-10 mt-10 mr-10"}>
                <p className="text text_type_main-large"> Детали ингредиента </p>
            </div>
            <img  alt={details.title}    src={details.image_large}  />
            <div className={s.name + " mt-4"}>
                <p className={"mt-1 text text_type_main-medium"}>{details.name}</p>
            </div>


            <div className={s.desc + " mt-8"}>
                <div className={s.descItem}>
                    <p className="text text_type_main-default text_color_inactive">Каллории,калл</p>
                    <p className="text text_type_main-default text_color_inactive">{details.calories}</p>
                </div>

                <div className={s.descItem}>
                    <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                    <p className="text text_type_main-default text_color_inactive">{details.proteins}</p>
                </div>

                <div className={s.descItem}>
                    <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                    <p className="text text_type_main-default text_color_inactive">{details.fat}</p>
                </div>

                <div className={s.descItem}>
                    <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                    <p className="text text_type_main-default text_color_inactive">{details.fat}</p>
                </div>
            </div>

        </div>
    )
    else  return (<> </>)

}

export  default IngredientDetails ;
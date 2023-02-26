import React from 'react';
import  s from './IngredientDetails.module.css'
import PropTypes from 'prop-types';
import {useSelector} from "react-redux";
import {ingredientsModalSelector} from "../../../services/selectors/selectors";

function IngredientDetails () {
const  details = useSelector(ingredientsModalSelector);
    return(
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

}
IngredientDetails.propTypes = {
    title: PropTypes.string,
    name: PropTypes.string,
    calories: PropTypes.number,
    fat: PropTypes.number,
    proteins: PropTypes.number,
    image_large: PropTypes.string
}
export  default IngredientDetails ;
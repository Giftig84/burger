import React from 'react';
import  s from './IngrSection.module.css'
import Ingredient from "../Ingredient/Ingredient";
import PropTypes from 'prop-types';


function IngrSection (props) {
        let ingrType;
        switch (props.name){
            case "Булки": ingrType='bun'; break;
            case "Соусы": ingrType='sauce'; break;
            case "Начинки": ingrType='main'; break;
            default: ingrType = 'unknown';
        }
        return(
            <>
                <div className={ "mt-10"}>
                    <p className="text text_type_main-medium">{props.name}</p>
                </div>
                <div className={s.items + " mt-6"}>
                    { props.data.map((el)=>{
                        if(el.type === ingrType)
                            return (
                                <div className={s.ingr + " ml-4 mr-2"} key = {el._id} >
                                    <Ingredient count = {1}
                                                image ={el.image}
                                                price = {el.price}
                                                desc = {el.name}
                                    />
                                </div>

                            )
                        else return  null;
                    })
                    }
                </div>
            </>
        )
}

IngrSection.propTypes = {
    data: PropTypes.array,
    name: PropTypes.string
};
export  default  IngrSection;
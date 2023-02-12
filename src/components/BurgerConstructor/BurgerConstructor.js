import React from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import  s from './BurgerConstructor.module.css';
import FinishOrder from './FinishOrder/FinishOrder';
import PropTypes from 'prop-types';
import {dataIngredient} from "../../ImportFiles/dataIngredient";

function BurgerConstructor (props) {

    const bun = props.arrIngredient.find(el => el.name === "Краторная булка N-200i");

        return(
            <div className = {s.main + " ml-5"}>
                <div className={s.cont + " ml-4 mt-25"}>
                       {bun &&      <div className={"ml-8"} >
                                           <ConstructorElement
                                               type="top"
                                               isLocked={true}
                                               text= {bun.name + " (верх)"}
                                               price={bun.price}
                                               thumbnail={bun.image_mobile}
                                           />
                                       </div>
                       }
                       <div className={s.scroll }>
                           {props.arrIngredient.filter(el => el.type !== "bun").map((el) => {
                              return(
                                       <div className={ s.center +" mr-2"} key={el._id}>

                                           <div className={s.dragIcon}>
                                               <DragIcon type="primary" />
                                           </div>

                                           <ConstructorElement
                                               text={el.name}
                                               price={el.price}
                                               thumbnail={el.image_mobile}
                                           />
                                       </div> )
                           })
                           }
                       </div>
                        {bun &&
                                    <div className={"ml-8"} >
                                        <ConstructorElement
                                            type="bottom"
                                            isLocked={true}
                                            text= {bun.name + " (низ)"}
                                            price={bun.price}
                                            thumbnail={bun.image_mobile}
                                        />
                                    </div>
                        }
                <div>

                </div>
                    <div className={s.fin + " mt-10 ml-4 mr-4"}>
                        <FinishOrder totalSum ={610}></FinishOrder>
                    </div>

                </div>
            </div>

        )
}

BurgerConstructor.propTypes = {
    arrIngredient: PropTypes.arrayOf(PropTypes.shape(dataIngredient).isRequired).isRequired
};

export default BurgerConstructor;
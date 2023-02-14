import React from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import  s from './BurgerConstructor.module.css';
import FinishOrder from './FinishOrder/FinishOrder';
import PropTypes from 'prop-types';
import {dataIngredient} from "../../ImportFiles/dataIngredient";
import {IngredientContext} from "../../ImportFiles/IngredientContext";

function BurgerConstructor () {
    const {order, setOrder} = React.useContext(IngredientContext);
    const [totalSum, setTotalSum] = React.useState(0);
    const [bun, setBun] = React.useState(order.arrIngredient.find(el => el.name === "Краторная булка N-200i"));

    //const bun = order.arrIngredient.find(el => el.name === "Краторная булка N-200i"); + (bun.price * 2))


    React.useEffect(()=>{
        if (order.arrIngredient.length > 0){
            const bun = order.arrIngredient.find(el => el.name === "Краторная булка N-200i"); //булку пока захардкодил, в т.з. нет описания логики
            setBun(bun)
            setTotalSum(order.arrIngredient.filter(el => el.type !== "bun").reduce((sum, el) => sum + el.price, 0) + (bun.price * 2)  );
        } else setTotalSum(0);
    }, [order])

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
                           {order.arrIngredient.filter(el => el.type !== "bun").map((el) => {
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
                        <FinishOrder totalSum ={totalSum}></FinishOrder>
                    </div>

                </div>
            </div>

        )
}

IngredientContext.propTypes = {
    arrIngredient:  PropTypes.arrayOf(PropTypes.shape(dataIngredient).isRequired).isRequired
};

export default BurgerConstructor;
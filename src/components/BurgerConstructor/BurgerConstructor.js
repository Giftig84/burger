import React from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import  s from './BurgerConstructor.module.css';
import FinishOrder from './FinishOrder/FinishOrder';
import PropTypes from 'prop-types';


class BurgerConstructor extends  React.Component {
    render () {
        return(
            <div className = {s.main}>
                <div className={s.cont + " ml-4 mt-25"}>
                       {this.props.data.map((el) => {
                           if(el._id ==='60666c42cc7b410027a1a9b1')
                                   return (
                                       <div className={"ml-8"} key={el._id}>
                                           <ConstructorElement
                                               type="top"
                                               isLocked={true}
                                               text= {el.name + " (верх)"}
                                               price={el.price}
                                               thumbnail={el.image_mobile}
                                           />
                                       </div>
                                   )
                           else return  null;
                            })
                       }
                       <div className={s.scroll }>
                           {this.props.data.map((el) => {
                               if(el._id !=='60666c42cc7b410027a1a9b1')
                                   return (
                                       <div className={ s.center +" mr-2"} key={el._id}>
                                           <div style={{ width: '32px' }}>
                                               <DragIcon type="primary" />
                                           </div>

                                           <ConstructorElement
                                               text={el.name}
                                               price={el.price}
                                               thumbnail={el.image_mobile}
                                           />
                                       </div>
                                   )
                               else return  null;
                           })
                           }
                       </div>
                        {this.props.data.map((el) => {
                            if(el._id ==='60666c42cc7b410027a1a9b1')
                                return (
                                    <div className={"ml-8"} key={el._id}>
                                        <ConstructorElement
                                            type="bottom"
                                            isLocked={true}
                                            text= {el.name + " (низ)"}
                                            price={el.price}
                                            thumbnail={el.image_mobile}
                                        />
                                    </div>
                                )
                            else return  null;
                        })
                        }
                <div>

                </div>
                    <div className={s.fin + " mt-10 ml-4 mr-4"}>
                        <FinishOrder totalSum ={610}></FinishOrder>
                    </div>

                </div>
            </div>

        )}
}
BurgerConstructor.propTypes = {
    data: PropTypes.array
};
export default BurgerConstructor;
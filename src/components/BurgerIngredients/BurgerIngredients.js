import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import  s from './BurgerIngredients.module.css'
import Ingredient from "./Ingredient/Ingredient";
import PropTypes from 'prop-types';

class BurgerIngredients extends  React.Component {
   render () {
       return(
           <div className={s.main}>

               <div className={s.header + " mt-10"}>
                   <p>Соберите бургер</p>
               </div>
               <div className={s.tab + " mt-5"}>
                   <Tab value="one" >
                       Булки
                   </Tab>
                   <Tab value="two" >
                       Соусы
                   </Tab>
                   <Tab value="three" >
                       Начинки
                   </Tab>
               </div>
               <div className={s.scroll}>
                   <div className={ "mt-10"}>
                       <p className="text text_type_main-medium">Булки</p>
                   </div>
                   <div className={s.items + " mt-6"}>
                       { this.props.data.map((el)=>{
                           if(el.type ==='bun')
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
                   <div className={ "mt-10"}>
                       <p className="text text_type_main-medium">Соусы</p>
                   </div>
                   <div className={s.items + " mt-6"}>
                       { this.props.data.map((el)=>{
                           if(el.type ==='sauce')
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
                   <div className={ "mt-10"}>
                       <p className="text text_type_main-medium">Начинки</p>
                   </div>
                   <div className={s.items + " mt-6"}>
                       { this.props.data.map((el)=>{
                           if(el.type ==='main')
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
               </div>
           </div>
       )
    }
};
BurgerIngredients.propTypes = {
    data: PropTypes.array
};
 export  default BurgerIngredients ;
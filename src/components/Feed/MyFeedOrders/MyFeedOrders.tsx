import React, {FC} from 'react';
import  s from './MyFeedOrders.module.css';
import Order from "../Order/Order";
import { useSelector} from "react-redux";
import {allFeedSelector} from "../../../services/selectors/selectors";
import {TOrder} from "../../../Types/types";

const MyFeedOrders: FC = () =>{
    const data =  useSelector(allFeedSelector);
    const orders: Array<TOrder> = data?.orders ? data?.orders : [];
    return(
           <div className={s.main + " mr-5"}>
               <div className={s.scroll} id = "tabsDiv" >
                   { orders.length >0 && (
                       orders.map((el, index) => {
                           return( <Order {...el} key={index} showStatus={true} linkTo={"/profile/orders/"}/>  )
                       }))
                   }
               </div>
           </div>
       )
}
export default React.memo(MyFeedOrders);

import React, {FC} from 'react';
import  s from './FeedMainInfo.module.css';
import { useSelector} from "react-redux";
import {TOrder, TOrderResponse} from "../../../Types/types";
import {allFeedSelector} from "../../../services/selectors/selectors";

const FeedMainInfo: FC = () => {
    const feed: TOrderResponse = useSelector(allFeedSelector);
    const orders: Array<TOrder> = feed?.orders ? feed?.orders : [];
    const doneOrder = orders.filter(el => el.status  === 'done');
    const pendingOrder = orders.filter(el => el.status === 'pending');
        return(
            <div className = {s.main + " ml-5"} >
                <div className={s.tableTop + " mt-15"}>
                    <div className={s.tableHeader + " text text_type_main-medium"}>Готовы:
                        <div className={s.orderList + " mt-6 text text_type_digits-default"}>
                            {doneOrder && doneOrder.map((doneOrder, index) => {
                                if (index < 10) {
                                    return <div className={s.doneOrder + " mb-2"} key={index}>{doneOrder.number}</div>;
                                }
                                else return null;
                            })}
                        </div>
                    </div>
                    <div className={s.tableHeader + " text text_type_main-medium pb-6"}> В работе:
                        <div className={s.orderList + " mt-6 text text_type_digits-default"}>
                            {pendingOrder && pendingOrder.map((pendingOrder, index) => {
                                if (index < 10) {
                                    return <div className={"mb-2"} key={index}>{pendingOrder.number}</div>;
                                }
                                else return null;
                            })}
                        </div>
                    </div>
                </div>
                <div className={s.text + " mt-15  text text_type_main-medium"}>
                    Выполнено за все время:
                </div>
                <div className={s.total + " pl-1 text text_type_digits-large"}>
                    {feed.total}
                </div>
                <div className={s.text + " mt-15  text text_type_main-medium"}>
                    Выполнено за сегодня:
                </div>
                <div className={s.total + " pl-1 text text_type_digits-large"}>
                    {feed.totalToday}
                </div>
            </div>

        )
}
export default FeedMainInfo;
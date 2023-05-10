import React, {FC,  useEffect} from 'react';
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import  s from './Page.module.css'
import {useDispatch} from "react-redux";
import {connectionStartAction, WS_CONNECTION_CLOSED} from "../services/actions/wsFeedsAction";
import {FEED_USER_URL, TOKEN_KEY} from "../ImportFiles/endPointUrl";
import {ProfileNavigation} from "../components/ProfileNavigation/ProfileNavigation";
import MyFeedOrders from "../components/Feed/MyFeedOrders/MyFeedOrders";
import {getCookie} from "../Utils/Utils";

export const MyOrders:FC = () => {
    const dispatch  = useDispatch();
    useEffect(() => {
        let accessToken = getCookie(TOKEN_KEY);
        if (accessToken != undefined)
        {
            accessToken = accessToken.replace(/(Bearer\s)/g, '') ;
        }
        dispatch(connectionStartAction(FEED_USER_URL + `?token=${accessToken}`));
        return () => {
            dispatch({type: WS_CONNECTION_CLOSED});
        };
    }, [dispatch]);

    return (
        <main className={s.history}>
            <DndProvider backend={HTML5Backend}>
                <div className={s.navigation}>
                    <ProfileNavigation description={"В этом разделе вы можете просмотреть свою историю заказов"}/>
                </div>
                <div className={"ml-15"}>
                    <MyFeedOrders/>
                </div>

            </DndProvider>
        </main>
    )
}
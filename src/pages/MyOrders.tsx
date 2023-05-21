import React, {FC,  useEffect} from 'react';
import  s from './Page.module.css'
import {FEED_USER_URL, TOKEN_KEY} from "../ImportFiles/endPointUrl";
import {ProfileNavigation} from "../components/ProfileNavigation/ProfileNavigation";
import MyFeedOrders from "../components/Feed/MyFeedOrders/MyFeedOrders";
import {getCookie} from "../Utils/Utils";
import {connectionStartProfileAction, WS_PROFILE_CONNECTION_CLOSED} from "../services/actions/wsFeedsProfileAction";
import {useAppDispatch} from "../Types/types";

export const MyOrders:FC = () => {
    const dispatch  = useAppDispatch();
    useEffect(() => {
        let accessToken = getCookie(TOKEN_KEY);
        if (accessToken != undefined)
        {
            accessToken = accessToken.replace(/(Bearer\s)/g, '') ;
        }
        dispatch(connectionStartProfileAction(FEED_USER_URL + `?token=${accessToken}`));
        return () => {
            dispatch({type: WS_PROFILE_CONNECTION_CLOSED});
        };
    }, [dispatch]);

    return (
        <main className={s.history}>
            <div className={s.navigation}>
                <ProfileNavigation description={"В этом разделе вы можете просмотреть свою историю заказов"}/>
            </div>
            <div className={"ml-15"}>
                <MyFeedOrders/>
            </div>
        </main>
    )
}
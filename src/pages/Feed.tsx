import React, {FC, useEffect} from 'react';
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import s from "../components/App/app.module.css";
import FeedOrders from "../components/Feed/FeedOrders";
import FeedMainInfo from "../components/Feed/FeedMainInfo/FeedMainInfo";
import {connectionStartAction, WS_CONNECTION_CLOSED} from "../services/actions/wsFeedsAction";
import {FEED_URL} from "../ImportFiles/endPointUrl";
import {useAppDispatch} from "../Types/types";

export const Feed:FC = () => {
    const dispatch  = useAppDispatch();
    useEffect(() => {
        dispatch(connectionStartAction(FEED_URL));
        return () => {
            dispatch({type: WS_CONNECTION_CLOSED});
        };
    }, [dispatch]);

    return (
        <main className={s.main}>
            <DndProvider backend={HTML5Backend}>
                <FeedOrders/>
                <FeedMainInfo/>
            </DndProvider>
        </main>
    )
}
import React, {useEffect} from 'react';
import AppHeader from '../AppHeader/AppHeader';
import s from './app.module.css'
import ClipLoader from "react-spinners/ClipLoader";
import {useDispatch, useSelector} from "react-redux";

import {authSelector, isLoadingSelector} from "../../services/selectors/selectors";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Main} from "../../pages/Main";
import  {Full} from "../../pages/Full";
import {Registration} from "../../pages/Registration";
import {Login} from "../../pages/Login";
import {ForgotPassword} from "../../pages/ForgotPassword";
import {ResetPassword} from "../../pages/ResetPassword";
import {Profile} from "../../pages/Profile";
import {Page404} from "../../pages/Page404";
import {ProtectedRoute} from "../ProtectedRoute/ProtectedRoute";
import {getUser} from "../../services/actions/userAction";
import {getCookie} from "../../Utils/Utils";


function App() {
    const isLoading = useSelector(isLoadingSelector);
    const isAuth = useSelector(authSelector);
    const dispatch = useDispatch();
    const accessToken = getCookie('token');

    useEffect(() => {
        if(!isAuth && accessToken) dispatch(getUser());
    },[])

    return (
        <div className={s.app}>
            {isLoading &&
                <ClipLoader className={s.loader}
                            color="#4C4CFF"
                            loading={isLoading}
                            size={250}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                />}

            <BrowserRouter>
                <AppHeader/>
                <Routes>
                    <Route path="/" element={<Main/>}/>
                    <Route path="/profile" element={<ProtectedRoute element={<Profile/>}/>}/>
                    <Route path="/reset-password" element={<ResetPassword/>}/>
                    <Route path="/forgot-password" element={<ProtectedRoute element={<ForgotPassword/>} onlyUnAuth={true}/>}/>
                    <Route path="/login" element={<ProtectedRoute element={<Login/>} onlyUnAuth={true}/>}/>
                    <Route path="/register" element={<ProtectedRoute element={<Registration/>} onlyUnAuth={true}/>}/>
                    <Route path="/ingredients/:id" element={<Full/>}/>
                    <Route path="*" element={<Page404/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}
export default App;
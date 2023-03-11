import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import s from './app.module.css'
import ClipLoader from "react-spinners/ClipLoader";
import {useSelector} from "react-redux";

import {isLoadingSelector} from "../../services/selectors/selectors";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Main} from "../../pages/Main";
import  {Full} from "../../pages/Full";
import {Registration} from "../../pages/Registration";
import {Login} from "../../pages/Login";
import {ForgotPassword} from "../../pages/ForgotPassword";
import {ResetPassword} from "../../pages/ResetPassword";
import {Profile} from "../../pages/Profile";
import {ProtectedRoute} from "../ProtectedRoute/ProtectedRoute";




function App() {
    const isLoading = useSelector(isLoadingSelector);

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
                    <Route path="/forgot-password" element={<ForgotPassword/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Registration/>}/>
                    <Route path="/ingredients/:id" element={<Full/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}
export default App;
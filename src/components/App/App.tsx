import React, {useEffect, FC, useCallback} from 'react';
import AppHeader from '../AppHeader/AppHeader';
import s from './app.module.css'
import ClipLoader from "react-spinners/ClipLoader";
import {authSelector, ingredientsSelector, isLoadingSelector} from "../../services/selectors/selectors";
import { Routes, Route, useLocation, useNavigate} from 'react-router-dom';
import {Main} from "../../pages/Main";
import {Registration} from "../../pages/Registration";
import {Login} from "../../pages/Login";
import {ForgotPassword} from "../../pages/ForgotPassword";
import {ResetPassword} from "../../pages/ResetPassword";
import {Profile} from "../../pages/Profile";
import {Feed} from "../../pages/Feed";
import {Page404} from "../../pages/Page404";
import {ProtectedRoute} from "../ProtectedRoute/ProtectedRoute";
import {getUser} from "../../services/actions/userAction";
import {getCookie} from "../../Utils/Utils";
import {useAppDispatch, useAppSelector} from "../../Types/types";
import {TOKEN_KEY} from "../../ImportFiles/endPointUrl";
import {fetchIngredientRequest, INGREDIENTS_REQUEST} from "../../services/actions/ingredientActions";
import {MyOrders} from "../../pages/MyOrders";
import Modal from "../Modal/Modal";
import IngredientDetails from "../BurgerIngredients/IngredientDetails/IngredientDetails";
import {unsetModalDetailsAction} from "../../services/actions/modalDetailsActions";
import OrderDetails from "../Feed/OrderIDetails/OrderDetails";
import {unsetOrderModalDetailsAction} from "../../services/actions/modalFeedOrderActions";


const App:FC = () =>{
    const isLoading = useAppSelector(isLoadingSelector);
    const isAuth = useAppSelector(authSelector);
    const dispatch = useAppDispatch();
    const accessToken: string | undefined = getCookie(TOKEN_KEY);
    const allIngredietn = useAppSelector(ingredientsSelector);
    useEffect(() => {
        if(!isAuth && accessToken !="")
            dispatch(getUser());
    },[]);

    const init = useCallback(()=>{
        if(allIngredietn.length==0) {
            dispatch({type: INGREDIENTS_REQUEST});
            dispatch(fetchIngredientRequest("/ingredients"));
        }
    },[allIngredietn, dispatch])
    React.useEffect(() => {
        init();
    }, []);

    const location = useLocation();
    const background = location.state && location.state.background;
    const navigate = useNavigate();

    const handleModalClose = ():void => {
        dispatch(unsetModalDetailsAction());
        navigate(-1);
    };

    const handleOrderModalClose = ():void => {
        dispatch(unsetOrderModalDetailsAction());
        navigate(-1);
    };
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

                <AppHeader/>
                <Routes location={background || location}>
                    <Route path="/" element={<Main/>}/>
                    <Route path="/profile" element={<ProtectedRoute element={<Profile/>}/>}/>
                    <Route path="/reset-password" element={<ResetPassword/>}/>
                    <Route path="/forgot-password" element={<ProtectedRoute element={<ForgotPassword/>} onlyUnAuth={true}/>}/>
                    <Route path="/login" element={<ProtectedRoute element={<Login/>} onlyUnAuth={true}/>}/>
                    <Route path="/register" element={<ProtectedRoute element={<Registration/>} onlyUnAuth={true}/>}/>
                    <Route path="/ingredients/:id" element={<IngredientDetails />}/>
                    <Route path="/feed/:id" element={<OrderDetails/>}/>
                    <Route path="/feed" element={<Feed/>}/>
                    <Route path="/profile/orders" element={<ProtectedRoute element={<MyOrders/>}/>}/>
                    <Route path="/profile/orders/:id" element={<ProtectedRoute element={<OrderDetails/>}/>}/>
                    <Route path="*" element={<Page404/>}/>
                </Routes>

            {background && (
                <Routes>
                    <Route path='/ingredients/:id' element={<Modal closeModal={handleModalClose}> <IngredientDetails/> </Modal>}/>
                    <Route path='/feed/:id' element={<Modal closeModal={handleOrderModalClose}> <OrderDetails/>  </Modal>}/>
                    <Route path='/profile/orders/:id' element={<Modal closeModal={handleOrderModalClose}> <OrderDetails/>  </Modal>}/>
                </Routes>
            )}



        </div>
    );
}
export default App;
import React from 'react';
import {Routes, Route} from 'react-router-dom'
import {eventRoute, loginRoute} from "../router";
import {Event} from "../pages/Event";
import {Login} from "../pages/Login";
import {useTypedSelector} from "../hooks/useTypedSelector";

export const AppRouter = () => {
    const {isAuth} = useTypedSelector(state => state.authReducer)
    return (
        <Routes>
            {isAuth && <Route path={eventRoute.path} element={<Event />}/>}
            <Route path={loginRoute.path} element={<Login />}/>
            <Route path="*" element={<Login />}/>
        </Routes>
    );
};

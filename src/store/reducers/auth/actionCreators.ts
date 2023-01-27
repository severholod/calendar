import {IUser} from "../../../models/IUser";
import {AuthActionsEnum, SetAuthAction, SetErrorAction, SetIsLoadingAction, SetUserAction} from "./types";
import {AppDispatch} from "../../index";
import UserService from "../../../api/userService";

export const AuthActionCreator = {
    setUser: (user: IUser): SetUserAction  => ({type: AuthActionsEnum.SET_USER, payload: user}),
    setIsLoading: (isLoading: boolean): SetIsLoadingAction => ({type: AuthActionsEnum.SET_IS_LOADING, payload: isLoading}),
    setIsAuth: (isAuth: boolean): SetAuthAction => ({type: AuthActionsEnum.SET_AUTH, payload: isAuth}),
    setError: (error: string): SetErrorAction => ({type: AuthActionsEnum.SET_ERROR, payload: error}),
    login: (username: string, password: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreator.setIsLoading(true))
            setTimeout(async () => {
                const users = await UserService.getUsers()
                const user = users.data.find((u) => u.username === username && u.password === password)
                if (user) {
                    localStorage.setItem('auth', 'true')
                    localStorage.setItem('username', user.username)
                    dispatch(AuthActionCreator.setUser(user))
                    dispatch(AuthActionCreator.setIsAuth(true))
                } else {
                    dispatch(AuthActionCreator.setError('Пользователь не найден'))
                }
                dispatch(AuthActionCreator.setIsLoading(false))
            }, 1000)
        } catch (e) {
            dispatch(AuthActionCreator.setIsLoading(false))
            dispatch(AuthActionCreator.setError('Что-то пошло не так'))
        }
    },
    logout: () => async (dispatch: AppDispatch) => {
        try {
            localStorage.removeItem('auth')
            localStorage.removeItem('username')
            dispatch(AuthActionCreator.setIsAuth(false))
            dispatch(AuthActionCreator.setUser({} as IUser))
        } catch (e) {
            dispatch(AuthActionCreator.setError('Что-то пошло не так'))
        }
    }
}
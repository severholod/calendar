export interface IRoute {
    path: string
    exact?: boolean
}
export enum RouteNames {
    LOGIN = '/login',
    EVENT = '/'
}
export const loginRoute: IRoute = {
    path: RouteNames.LOGIN,
    exact: true
}
export const eventRoute: IRoute = {
    path: RouteNames.EVENT,
    exact: true
}